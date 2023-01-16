import { makeQuery } from "../config/database";
import { IUser } from "../interfaces/IUser";
import uniqid from "uniqid";
import { createToken } from "../helpers/createToken";
import bcrypt from "bcryptjs";

export class User {
  static async findByEmail(email: string) {
    const query = `
    SELECT * from users
    WHERE email = ?;
    `;

    const user = await makeQuery<IUser>(query, [email]);
    return user === null ? null : user[0];
  }

  async create([fullname, email, password]: string[]) {
    const id = uniqid();
    const encryptedPassword = await bcrypt.hash(password, 10);
    const token = createToken(id, email);

    const userData = [
      id,
      fullname,
      email.toLowerCase(),
      encryptedPassword,
      token,
    ];

    const query = `
      INSERT INTO users
      (_id, fullname, email, password, token)
      VALUES
      (?, ?, ?, ?, ?);
    `;

    const user = await makeQuery<IUser>(query, userData);
    return user === null ? null : user;
  }

  static async refreshUserToken(id: string, email: string) {
    const token = createToken(id, email);

    const query = `
      UPDATE users
      SET token = ?
      WHERE email = ?;
    `;

    const result = await makeQuery<IUser>(query, [token, email]);
    return result === null ? null : result;
  }
}
