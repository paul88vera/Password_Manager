const mysql = require("mysql2/promise");
require("@dotenvx/dotenvx").config();

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.VITE_SQL_USER || "root",
      password: process.env.VITE_SQL_PASSWD,
      database: process.env.VITE_SQL_DB,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("Database connected successfully!");
    return connection;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
}

module.exports = connectDB();
