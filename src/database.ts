import mysql, { QueryError } from "mysql2";
import { IPost } from "./interfaces/IPost";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "intership_site_blog",
});

conn.connect((err: QueryError | null): void => {
  if (err) console.log(err);
  else console.log("Database ===> OK");
});

export const makeQuery = async (
  query: string,
  data: IPost | (string | undefined)[]
) => {
  try {
    const [rows, fields] = await conn.promise().query(query, data);
    return rows;
  } catch (err) {
    console.log(err);
  }
};
