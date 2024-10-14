const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.dev" });

const config = {
  host: process.env.DB_HOST || "localhost", // địa chỉ máy chủ
  user: process.env.DB_USER || "root", // tên người dùng
  password: process.env.DB_PASSWORD || "", // mật khẩu
  database: process.env.DB_NAME || "e_learning", // tên cơ sở dữ liệu
};

// Kết nối đến MariaDB
const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MariaDB:", err); // Thay đổi thông báo lỗi cho rõ ràng
    return;
  }
  console.log("Connected to MariaDB!");
});

module.exports = connection;
