const User = require("../models/UserModel");
const authService = require("../services/authService");

const createAdmin = async () => {
  const adminEmail = "admin@example.com"; // Email admin muốn tạo
  const adminPassword = "admin123"; // Mật khẩu admin
  const adminRole = "admin"; // Vai trò admin

  try {
    // Kiểm tra xem admin đã tồn tại chưa
    const existingAdmin = await User.findByEmail(adminEmail);

    if (existingAdmin) {
      console.log("Admin account already exists.");
      return; // Nếu admin đã tồn tại, dừng lại ở đây
    }

    // Nếu chưa có, tạo mới tài khoản admin
    const adminData = {
      email: adminEmail,
      password: adminPassword,
      role: adminRole,
    };

    // Gọi dịch vụ đăng ký để tạo tài khoản admin
    const result = await authService.signup(adminData);
    console.log("Admin account created successfully:", result);
  } catch (error) {
    console.error("Error creating admin account:", error.message);
  }
};

createAdmin();
