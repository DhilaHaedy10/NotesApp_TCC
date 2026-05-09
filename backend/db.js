const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('DB Error:', err);
    return;
  }

  console.log('MySQL Connected');
  console.log('HOST:', process.env.DB_HOST);
  console.log('DB:', process.env.DB_NAME);
  connection.release();
});

module.exports = db;
