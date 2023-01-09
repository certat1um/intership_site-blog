import mysql, { QueryError } from "mysql2";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "intership_site_blog",
});

conn.connect((err: QueryError | null): void => {
  if (err) console.log(err);
  else console.log("Database ===> OK");
});

export const makeQuery = async (query: string, data: string[]) => {
  try {
    const [rows, fields] = await conn.promise().query(query, data);
    if (!Object.keys(rows).length) {
      return null;
    }
    return rows[0];
  } catch (err) {
    console.log(err);
  }
};
