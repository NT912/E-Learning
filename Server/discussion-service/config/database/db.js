const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.dev" });

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Giới hạn số lượng kết nối tối đa
  queueLimit: 0, // Giới hạn số lượng kết nối trong hàng đợi (0 là không giới hạn)
};

// Sử dụng createPool để tạo connection pool
const pool = mysql.createPool(config); // Tạo connection pool

module.exports = pool;
