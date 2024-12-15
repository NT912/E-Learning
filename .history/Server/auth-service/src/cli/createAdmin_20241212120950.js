const pool = require("../../config/database/db"); // Đảm bảo đã sử dụng pool
const bcrypt = require("bcrypt");

async function createAdminAccount(email, password) {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const [rows] = await pool.query("SELECT * FROM User WHERE Email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      console.log("Email đã tồn tại");
      return;
    }

    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Tạo tài khoản admin mới
    const [result] = await pool.query(
      "INSERT INTO User (Email, HashPassword, Role) VALUES (?, ?, ?)",
      [email, hashedPassword, "admin"]
    );

    console.log("Tạo tài khoản admin thành công:", result);
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản admin:", error);
  }
}

// Gọi hàm tạo tài khoản admin với các tham số được truyền vào từ dòng lệnh
createAdminAccount(process.argv[2], process.argv[3]);
