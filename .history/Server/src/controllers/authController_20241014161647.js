const authService = require("../services/authService");
const messages = require("../config/message.json");

const auth = {
  signup: async (userData) => {
    try {
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        return {
          success: false,
          title: messages.auth.signup.emailExists, // Tiêu đề thông báo lỗi
          description: messages.auth.signup.emailExists, // Mô tả lỗi
        };
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      // Đặt role mặc định là 'student' nếu không có role được truyền vào
      userData.role = userData.role || "student";

      // Tạo người dùng mới
      const user = await User.create(userData);
      return {
        success: true,
        title: messages.auth.signup.signupSuccess, // Tiêu đề thông báo thành công
        description: "User created successfully", // Mô tả chi tiết
        user,
      };
    } catch (error) {
      return {
        success: false,
        title: messages.auth.signup.signupFailed, // Tiêu đề thông báo lỗi
        description: error.message || messages.general.internalServerError, // Mô tả lỗi
      };
    }
  },

  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      return sendResponse(
        res,
        true,
        messages.auth.login.loginSuccess,
        result.message,
        { token: result.token }
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.auth.login.loginFailed,
        error.message || messages.general.internalServerError
      );
    }
  },
};

module.exports = auth;
