import { RowDataPacket } from "mysql2";

export interface IPost extends RowDataPacket {
  readonly _id?: string;
  title?: string;
  text?: string;
  readonly author_id?: string;
  readonly createdAt?: string;
  updatedAt?: string;
}
