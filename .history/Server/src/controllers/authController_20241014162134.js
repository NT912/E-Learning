const authService = require("../services/authService");
const messages = require("../config/message.json");
const sendResponse = require("../helpers/sendResponse");

const auth = {
  signup: async (userData) => {
    try {
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        return sendResponse(
          res,
        false,
          title: messages.auth.signup.emailExists, // Tiêu đề thông báo lỗi
          description: messages.auth.signup.emailExists, // Mô tả lỗi
        );
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

  login: async (userData) => {
    try {
      const user = await User.findByEmail(userData.email);
      if (!user) {
        return {
          success: false,
          title: messages.auth.login.loginFailed, // Tiêu đề thông báo lỗi
          description: messages.auth.login.loginFailed, // Mô tả lỗi
        };
      }

      const isMatch = await bcrypt.compare(
        userData.password,
        user.HashPassword
      );
      if (!isMatch) {
        return {
          success: false,
          title: messages.auth.login.loginFailed, // Tiêu đề thông báo lỗi
          description: messages.auth.login.loginFailed, // Mô tả lỗi
        };
      }

      // Tạo token
      const token = jwt.sign(
        { id: user.UserID, role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return {
        success: true,
        title: messages.auth.login.loginSuccess, // Tiêu đề thông báo thành công
        description: "Login successful", // Mô tả chi tiết
        token,
      };
    } catch (error) {
      return {
        success: false,
        title: messages.auth.login.loginFailed, // Tiêu đề thông báo lỗi
        description: error.message || messages.general.internalServerError, // Mô tả lỗi
      };
    }
  },
};

module.exports = auth;
