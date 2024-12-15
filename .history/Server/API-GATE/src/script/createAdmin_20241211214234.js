const bcrypt = require("bcryptjs");
const connection = require("../config/database/db");

const createAdminAccount = async () => {
  const adminEmail = "admin@example.com"; // Email cho admin
  const adminPassword = "123456"; // Mật khẩu
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const role = "admin";

  const query = `INSERT INTO user (Email, HashPassword, Role, CreateAt) VALUES (?, ?, ?, NOW())`;

  connection.query(query, [adminEmail, hashedPassword, role], (err, result) => {
    if (err) {
      console.error("Failed to create admin account:", err.message);
      process.exit(1);
    } else {
      console.log(
        `Admin account created successfully with email: ${adminEmail}`
      );
      process.exit(0);
    }
  });
};

createAdminAccount();
