import { RowDataPacket } from "mysql2";

export interface IUser extends RowDataPacket {
  readonly _id: string;
  fullname: string;
  email: string;
  password: string;
  token: string;
}
