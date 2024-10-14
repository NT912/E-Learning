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
          messages.auth.signup.emailExists,
          messages.auth.signup.emailExists
        );
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      // Đặt role mặc định là 'student' nếu không có role được truyền vào
      userData.role = userData.role || "student";

      // Tạo người dùng mới
      const user = await User.create(userData);
      return sendResponse(
        res,
        true,
        messages.auth.signup.signupSuccess,
        messages.auth.signup.description,
        user
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.auth.signup.signupFailed,
        error.message || messages.general.internalServerError
      );
    }
  },

  login: async (userData) => {
    try {
      const user = await User.findByEmail(userData.email);
      if (!user) {
        return sendResponse(
          res,
          false,
          messages.auth.login.loginFailed,
          messages.auth.login.loginFailed
        );
      }

      const isMatch = await bcrypt.compare(
        userData.password,
        user.HashPassword
      );
      if (!isMatch) {
        return sendResponse(
          success: false,
          title: messages.auth.login.loginFailed, // Tiêu đề thông báo lỗi
          description: messages.auth.login.loginFailed, // Mô tả lỗi
        );
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
