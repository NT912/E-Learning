const readline = require("readline");
const connection = require("../../config/database/db"); // Đảm bảo rằng đường dẫn đúng
const bcrypt = require("bcrypt");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Hàm tạo tài khoản admin
const createAdminAccount = () => {
  rl.question("Nhập email admin: ", async (email) => {
    // Kiểm tra email đã tồn tại trong cơ sở dữ liệu
    try {
      const existingAdmin = await findByEmail(email);
      if (existingAdmin) {
        console.log("Tài khoản admin với email này đã tồn tại.");
        rl.close();
        return;
      }

      rl.question("Nhập mật khẩu admin: ", async (password) => {
        // Mã hóa mật khẩu nếu cần
        const hashedPassword = await bcrypt.hash(password, 10); // 10 là độ khó của mã hóa

        // Ghi dữ liệu vào cơ sở dữ liệu
        const userData = {
          email: email,
          password: hashedPassword, // Lưu mật khẩu đã mã hóa
          role: "admin", // Đặt vai trò là admin
        };

        // Lưu vào cơ sở dữ liệu
        try {
          await createUser(userData);
          console.log("Tạo tài khoản admin thành công!");
        } catch (err) {
          console.error("Lỗi khi tạo tài khoản admin:", err);
        } finally {
          rl.close(); // Đóng giao diện nhập liệu
        }
      });
    } catch (err) {
      console.error("Lỗi khi kiểm tra email:", err);
      rl.close();
    }
  });
};

// Hàm tìm kiếm người dùng qua email
const findByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE Email = ?`;
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.log("Error fetching user by email:", err);
        reject(new Error("Error fetching user by email"));
      } else if (results.length === 0) {
        resolve(null); // Nếu không tìm thấy, trả về null
      } else {
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
