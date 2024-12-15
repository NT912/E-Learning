const readlineSync = require("readline-sync");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

// Hàm tạo tài khoản admin
const createAdminAccount = async () => {
  const email = readlineSync.question("Nhập email admin: ");

  try {
    const existingAdmin = await User.findByEmail(email);
    if (existingAdmin) {
      console.log("Tài khoản admin với email này đã tồn tại.");
      return;
    }

    const password = readlineSync.question("Nhập mật khẩu admin: ", {
      hideEchoBack: true,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email: email,
      password: hashedPassword,
      role: "admin",
    };

    try {
      await User.create(userData);
      console.log("Tạo tài khoản admin thành công!");
    } catch (err) {
      console.error("Lỗi khi tạo tài khoản admin:", err);
    }
  } catch (err) {
    console.error("Lỗi khi kiểm tra email:", err);
  }
};
createAdminAccount();
