import { RowDataPacket } from "mysql2";

export interface IUser extends RowDataPacket {
  _id?: string;
  fullname: string;
  email: string;
  password: string;
  token?: string;
}
