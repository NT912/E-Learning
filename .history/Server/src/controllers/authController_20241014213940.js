const authService = require("../services/authService");
const sendResponse = require("../helpers/sendResponse");
const messages = require("../config/message.json");

const auth = {
  signup: async (req, res) => {
    try {
      const result = await authService.signup(req.body);
      return sendResponse(
        res,
        true,
        messages.auth.signupSuccess.title,
        result.message, // Mô tả thành công từ service
        result.user // Trả về user nếu cần
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.auth.signupError.title,
        error.message || messages.auth.signupError.description.signupFailed
      );
    }
  },

  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      return sendResponse(
        res,
        true,
        messages.auth.loginSuccess.title,
        messages.auth.loginSuccess.description,
        { token: result.token } // Trả về token nếu đăng nhập thành công
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.auth.loginError.title,
        error.message || messages.auth.loginError.description.loginFailed
      );
    }
  },
};

module.exports = auth;
