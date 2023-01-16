import mysql, { Connection, QueryError, RowDataPacket } from "mysql2";

async function connect(): Promise<Connection> {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });

  conn.connect((err: QueryError | null): void => {
    console.log(err ?? "DB Request: success connect");
  });

  return conn;
}

export async function makeQuery<T extends RowDataPacket>(
  query: string,
  data?: unknown[]
): Promise<T[] | null> {
  try {
    const conn = await connect();
    const [rows] = await conn.promise().query<T[]>(query, data);
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  }
}
