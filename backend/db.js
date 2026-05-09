const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.error('DB Error:', err);
    return;
  }
  console.log('MySQL Connected (SSL) ✅');
  console.log("HOST:", process.env.DB_HOST);
  console.log("DB:", process.env.DB_NAME);
});

module.exports = db;