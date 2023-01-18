import bcrypt from "bcryptjs";
import uniqid from "uniqid";
import { IUser } from "../interfaces/IUser";
import { makeQuery } from "../config/database";
import { createToken } from "../helpers/createToken";
import { RowDataPacket } from "mysql2";

export class User {
  static async findByEmail(email: string): Promise<IUser | null> {
    const query = `
    SELECT * from users
    WHERE email = ?;
    `;

    const response = await makeQuery(query, [email]);
    if (response === null || !response.length) {
      return null;
    }
    const user = [...response] as IUser[];
    return user[0];
  }

  async create(data: {
    fullname: string;
    email: string;
    password: string;
  }): Promise<RowDataPacket[] | null> {
    const id = uniqid();
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const token = createToken(id, data.email);

    const userData = [
      id,
      data.fullname,
      data.email.toLowerCase(),
      encryptedPassword,
      token,
    ];

    const query = `
      INSERT INTO users
      (_id, fullname, email, password, token)
      VALUES
      (?, ?, ?, ?, ?);
    `;

    return makeQuery(query, userData);
  }

  static async refreshUserToken(
    id: string,
    email: string
  ): Promise<RowDataPacket[] | null> {
    const token = createToken(id, email);

    const query = `
      UPDATE users
      SET token = ?
      WHERE email = ?;
    `;

    return makeQuery(query, [token, email]);
  }
}
