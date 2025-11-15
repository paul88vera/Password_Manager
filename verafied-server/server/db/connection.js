const mysql = require("mysql2/promise");
require("@dotenvx/dotenvx").config();

async function connectDB() {
  try {
    const db = mysql.createPool({
      host: process.env.VITE_DB_HOST,
      user: process.env.VITE_SQL_USER,
      password: process.env.VITE_SQL_PASSWD,
      database: process.env.VITE_SQL_DB,
      port: process.env.VITE_DB_PORT || 3306,
    });

    console.log("Database connected successfully!");
    return db;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
}

module.exports = connectDB();
