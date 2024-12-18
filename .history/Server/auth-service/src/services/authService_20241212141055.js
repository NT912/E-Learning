const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const messages = require("../../config/message.json");
const userTokenService = require("./userToken");

const authService = {
  signup: async (userData) => {
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error(messages.auth.signupError.description.emailExists);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    userData.role = userData.role || "student";

    const user = await User.create(userData);
    return { message: messages.auth.signupSuccess.title, user };
  },

  login: async (userData) => {
    const { fcmToken } = userData;
    const user = await User.findByEmail(userData.email);
    if (!user) {
      throw new Error(messages.auth.loginError.description.invalidCredentials);
    }

    const isMatch = await bcrypt.compare(userData.password, user.HashPassword);
    if (!isMatch) {
      throw new Error(messages.auth.loginError.description.invalidCredentials);
    }

    // Lưu FCM token cho người dùng vào bảng `user_tokens`
    if (fcmToken) {
      await userTokenService.saveToken(
        user.UserID,
        fcmToken,
        userData.deviceType || "unknown"
      );
    }
    const token = jwt.sign(
      { id: user.UserID, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "128h" }
    );

    return { token };
  },

  adminLogin: async (userData) => {
    // Kiểm tra xem email có tồn tại không
    const user = await User.findByEmail(userData.email);
    if (!user) {
      throw new Error(messages.auth.loginError.description.invalidCredentials);
    }

    // Kiểm tra xem người dùng có phải là admin không
    if (user.Role !== "admin") {
      throw new Error("Access denied: You must be an admin to log in here.");
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(userData.password, user.HashPassword);
    if (!isMatch) {
      throw new Error(messages.auth.loginError.description.invalidCredentials);
    }

    // Tạo token JWT cho admin
    const token = jwt.sign(
      { id: user.UserID, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "128h" }
    );

    return { token };
  },

  signupAdmin: async (userData) => {
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error(messages.auth.signupError.description.emailExists);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    userData.role = "admin";

    const user = await User.create(userData);
    return { message: messages.auth.signupSuccess.title, user };
  },
};

module.exports = authService;
