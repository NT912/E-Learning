const authService = require("../services/authService");

// Dữ liệu tài khoản admin
const adminData = {
  email: "admin@example.com", // Điền email của admin
  password: "admin123", // Điền mật khẩu của admin
};

(async () => {
  try {
    const result = await authService.createAdminAccount(adminData);
    console.log(result.message); // In ra thông báo thành công
    console.log("Admin info:", result.user); // In ra thông tin người dùng đã tạo
  } catch (error) {
    console.error("Error creating admin account:", error.message);
  }
})();
