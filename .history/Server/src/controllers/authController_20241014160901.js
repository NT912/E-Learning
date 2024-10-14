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
        false, // Failure
        messages.auth.signup.signupFailed, // Lấy tiêu đề lỗi từ message.json
        error.message || messages.general.internalServerError // Nội dung lỗi
      );
    }
  },

  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({ message: result.message, token: result.token });
    } catch (error) {
      res.status(400).json({
        message: error.message || messages.general.internalServerError,
      });
    }
  },
};

module.exports = auth;
