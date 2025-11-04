const mysql = require("mysql2/promise");
require("@dotenvx/dotenvx").config();

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      // host: process.env.DB_HOST, // just for Docker
      port: process.env.DB_PORT, // changed from '|| 3306'
      user: process.env.VITE_SQL_USER,
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
