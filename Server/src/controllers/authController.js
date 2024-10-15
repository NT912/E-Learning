const authService = require("../services/authService");
const sendResponse = require("../helpers/sendResponse");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const messages = require("../config/message.json")

const auth = {
  signup: async (req, res) => {
    try {
      const userData = req.body;
      console.log(req.body)
      // Kiểm tra Email đã tồn tại chưa
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        return sendResponse(
          res,
          false,
          messages.auth.signup.title,
          messages.auth.signup.description.emailExists
        );
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      userData.role = userData.role || "student";

      const user = await User.create(userData);
      return sendResponse(
        res,
        true,
        messages.auth.signup.title,
        {}
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        false,
        messages.auth.signup.title,
        error.message || messages.auth.signup.description.signupFailed
      );
    }
  },

  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      return sendResponse(
        res,
        true,
        messages.auth.login.title,
        result.message,
        { token: result.token }
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.auth.login.title,
        error.message || messages.auth.login.description.loginFailed
      );
    }
  },
};

module.exports = auth;
