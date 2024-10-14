const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const messages = require("../config/message.json");
const sendResponse = require("../helpers/sendResponse");

const authService = {
  signup: async (userData, res) => {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      return sendResponse(
        res,
        false,
        messages.auth.signup.emailExists,
        messages.auth.signup.description
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
  },

  login: async (res, userData) => {
    const user = await User.findByEmail(userData.email);
    if (!user) {
      return sendResponse(
        res,
        false,
        messages.auth.login.loginFailed,
        messages.auth.login.description
      );
    }

    const isMatch = await bcrypt.compare(userData.password, user.HashPassword);
    if (!isMatch) {
      return sendResponse(
        res,
        false,
        messages.auth.login.loginFailed,
        messages.auth.login.description
      );
    }

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
  },
};

module.exports = authService;
