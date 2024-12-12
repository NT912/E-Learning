const readlineSync = require("readline-sync");
const connection = require("../../config/database/db"); // Đảm bảo rằng đường dẫn đúng
const bcrypt = require("bcrypt");

// Hàm tạo tài khoản admin
const createAdminAccount = async () => {
  const email = readlineSync.question("Nhập email admin: ");

  try {
    const existingAdmin = await findByEmail(email);
    if (existingAdmin) {
      console.log("Tài khoản admin với email này đã tồn tại.");
      return;
    }

    const password = readlineSync.question("Nhập mật khẩu admin: ", {
      hideEchoBack: true, // Ẩn ký tự khi nhập mật khẩu
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email: email,
      password: hashedPassword,
      role: "admin",
    };

    try {
      await createUser(userData);
      console.log("Tạo tài khoản admin thành công!");
    } catch (err) {
      console.error("Lỗi khi tạo tài khoản admin:", err);
    }
  } catch (err) {
    console.error("Lỗi khi kiểm tra email:", err);
  }
};

// Hàm tìm kiếm người dùng qua email
const findByEmail = async (email) => {
  console.log("Checking email:", email); // Log email
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE Email = ?`;
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.log("Error fetching user by email:", err);
        reject(new Error("Error fetching user by email"));
      } else if (results.length === 0) {
        resolve(null);
      } else {
        console.log("User found:", results[0]); // Log result
        resolve(results[0]);
      }
    });
  });
};

// Hàm tạo người dùng mới
const createUser = async (userData) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO user (Email, HashPassword, Role, CreateAt) VALUES (?, ?, ?, ?)`;
    connection.query(
      query,
      [userData.email, userData.password, userData.role, new Date()],
      (err, result) => {
        if (err) {
          console.log("Error during user creation:", err);
          reject(new Error("Error creating user"));
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Gọi hàm để tạo tài khoản admin
createAdminAccount();
