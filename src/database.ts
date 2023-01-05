import mysql from 'mysql2';

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'intership_site_blog',
});

conn.connect((err: any): void => {
  if(err) console.log(err);
  else console.log('Database ===> OK');
});

export const makeQuery = async (query: string, data: (string | undefined)[]) => {
  try {
    return await conn.promise().query(query, data);
  } catch (err) {
      console.log(err);
  }
};
