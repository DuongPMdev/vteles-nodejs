const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'duongpm13',
  password: process.env.DB_PASSWORD || 'Vhomes5555@',
  database: process.env.DB_NAME || 'vteles'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;
