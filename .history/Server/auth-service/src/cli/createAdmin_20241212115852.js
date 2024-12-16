const bcrypt = require("bcryptjs");
const connection = require("../../config/database/db"); // Đảm bảo đường dẫn này chính xác

// Hàm tạo tài khoản admin
const createAdmin = (email, password) => {
  // Mã hóa mật khẩu
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
  connection.query(
    "SELECT * FROM users WHERE Email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu:", error);
        return; // Dừng lại nếu có lỗi truy vấn
      }

      if (results.length > 0) {
        // Nếu email đã tồn tại, in ra thông báo và không thực hiện thao tác tiếp theo
        console.log("Email đã tồn tại trong hệ thống.");
        return;
      }

      // Nếu email chưa tồn tại, tạo tài khoản admin mới
      const query =
        "INSERT INTO users (Email, HashPassword, Role, CreateAt) VALUES (?, ?, ?, NOW())";
      connection.query(
        query,
        [email, hashedPassword, "admin"],
        (insertError, insertResults) => {
          if (insertError) {
            console.error("Lỗi khi tạo tài khoản admin:", insertError);
            return; // Dừng lại nếu có lỗi khi insert
          }

          console.log("Tạo tài khoản admin thành công!");
        }
      );
    }
  );
};

// Gọi hàm tạo tài khoản admin
createAdmin("admin@gmail.com", "admin");
