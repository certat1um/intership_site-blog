import { IUser } from "../interfaces/IUser";
import uniqid from "uniqid";
import { makeQuery } from "../config/database";

export class User implements IUser {
  public _id?: string;
  public fullname: string;
  public email: string;
  public password: string;
  public token?: string;

  constructor(userData: IUser) {
    const { _id, fullname, email, password, token } = userData;

    if (!_id) {
      this._id = uniqid();
    } else {
      this._id = _id;
    }
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.token = token;
  }

  static async findByEmail(email: string) {
    const query = `
    SELECT * from users
    WHERE email = ?;
    `;

    const user = await makeQuery(query, [email]);
    return user ? new User(user) : user;
  }

  async create() {
    const userData = {
      _id: uniqid(),
      ...this,
    };

    const query = `
      INSERT INTO users
      (_id, fullname, email, password, token)
      VALUES
      (?, ?, ?, ?, ?);
    `;

    const user = await makeQuery(query, Object.values(userData));
    return user;
  }

  async refreshToken() {
    const query = `
      UPDATE users
      SET token = ?
      WHERE email = ?;
    `;

    const user = await makeQuery(query, [this.token, this.email]);
    return user;
  }
}
