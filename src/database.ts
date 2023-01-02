const mysql = require('mysql');

const conn = mysql.createConnection({
  database: 'intership_site_blog',
  host: 'localhost',
  user: 'root',
  //password: '',
  //insecureAuth: true,
});

conn.connect((err: string) => {
  if(err) console.log(err);
  else console.log('Database ===> OK');
});

module.exports = conn;
