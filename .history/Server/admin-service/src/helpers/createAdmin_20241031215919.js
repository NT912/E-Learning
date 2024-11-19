const bcrypt = require("bcryptjs");
const connection = require("../../config/database/db");

async function createAdminUser() {
  const email = "admin@example.com";
  const password = "123456";
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "admin";

  connection.query(
    `INSERT INTO user (Email, HashPassword, Role, CreateAt) VALUES (?, ?, ?, NOW())`,
    [email, hashedPassword, role],
    (err, results) => {
      if (err) {
        console.error("Failed to create admin user:", err.message);
      } else {
        console.log("Admin user created successfully");
      }
      connection.end();
    }
  );
}

createAdminUser();
