import mysql, { QueryError } from "mysql2";
import { IUser } from "../interfaces/IUser";
import { IPost } from "../interfaces/IPost";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "intership_site_blog",
});

conn.connect((err: QueryError | null): void => {
  console.log(err ?? "Database: OK");
});

export const makeQuery = async (
  query: string,
  data: unknown[]
): Promise<IUser[] | IPost[] | null> => {
  try {
    const [rows] = await conn.promise().query<IUser[]>(query, data);
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  }
};
