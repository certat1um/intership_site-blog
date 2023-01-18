import mysql, { Connection, QueryError, RowDataPacket } from "mysql2";
import { isArray } from "util";

async function connect(): Promise<Connection> {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });

  conn.connect((err: QueryError | null): void => {
    if (err) {
      console.log(err);
    }
    console.log("DB Request: success connect");
  });

  return await conn;
}

export async function makeQuery(
  query: string,
  data?: unknown[]
): Promise<RowDataPacket[] | null> {
  try {
    const conn = await connect();
    const [rows] = await conn.promise().execute<RowDataPacket[]>(query, data);
    if (isArray(rows) && !rows.length) {
      return null;
    }
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  }
}
