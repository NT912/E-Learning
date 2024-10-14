const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const messages = require("../config/message.json");
const sendResponse = require("../helpers/sendResponse");

const authService = {
  signup: async (userData) => {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      return sendResponse(res, false, messages.auth.signup.emailExists);
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Đặt role mặc định là 'student' nếu không có role được truyền vào
    userData.role = userData.role || "student";

    // Tạo người dùng mới
    const user = await User.create(userData);
    return { message: messages.auth.signup.signupSuccess, user };
  },

  login: async (userData) => {
    const user = await User.findByEmail(userData.email);
    if (!user) throw new Error(messages.auth.login.loginFailed);

    const isMatch = await bcrypt.compare(userData.password, user.HashPassword);
    if (!isMatch) throw new Error(messages.auth.login.loginFailed);

    const token = jwt.sign(
      { id: user.UserID, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { message: messages.auth.login.loginSuccess, token };
  },
};

module.exports = authService;
