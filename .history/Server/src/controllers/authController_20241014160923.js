const authService = require("../services/authService");
const messages = require("../config/message.json");

const auth = {
  signup: async (req, res) => {
    try {
      const result = await authService.signup(req.body);
      return sendResponse(
        res,
        true,
        messages.auth.signup.signupSuccess,
        result.message
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

  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      return sendResponse(
        res,
        true, // Success
        messages.auth.login.loginSuccess, // Lấy tiêu đề thành công từ message.json
        result.message, // Nội dung phản hồi từ authService
        { token: result.token } // Trả về token kèm theo
      );
    } catch (error) {
      res.status(400).json({
        message: error.message || messages.general.internalServerError,
      });
    }
  },
};

module.exports = auth;
