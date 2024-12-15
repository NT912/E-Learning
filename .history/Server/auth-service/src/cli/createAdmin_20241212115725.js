const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const messages = require("../../config/message.json");
const connection = require("../../config/database/db");

const createAdmin = async (email, password) => {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      console.log("Email đã tồn tại. Vui lòng chọn email khác.");
      return;
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo tài khoản admin
    const userData = {
      email: email,
      password: hashedPassword,
      role: "admin", // Đảm bảo rằng role là admin
    };

    await User.create(userData);
    console.log("Tạo tài khoản admin thành công!");
  } catch (error) {
    console.error("Lỗi khi tạo tài khoản admin:", error);
  }
};

// Lấy tham số từ terminal
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Cần cung cấp email và mật khẩu.");
} else {
  const [email, password] = args;
  createAdmin(email, password);
}
