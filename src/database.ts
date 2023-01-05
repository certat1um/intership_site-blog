const mysql = require('mysql');

const conn = mysql.createConnection({
  database: 'intership_site_blog',
  host: 'localhost',
  user: 'root',
});

conn.connect((err: string) => {
  if(err) console.log(err);
  else console.log('Database ===> OK');
});

export const makeQuery = (query: string) => {
  return new Promise((resolve, reject) => {
    conn.query(query, (err: any, data: any) => {
      if(err) reject(err);
      else resolve(data);
    });
  }); 
};
