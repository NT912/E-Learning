const authService = require("../services/authService");
const messages = require("../config/message.json");
const sendResponse = require("../helpers/sendResponse");

const auth = {
  signup: (userData, res) => {
    try {
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        return sendResponse(
          res,
          false,
          messages.auth.signup.emailExists,
          messages.auth.signup.description.emailExists
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
        messages.auth.signup.description.signupSuccess,
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

  login: async (res, userData) => {
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
          res,
          false,
          messages.auth.login.loginFailed,
          messages.auth.login.loginFailed
        );
      }

      // Tạo token
      const token = jwt.sign(
        { id: user.UserID, role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return sendResponse(
        res,
        true,
        messages.auth.login.loginSuccess,
        messages.auth.login.description,
        token
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
