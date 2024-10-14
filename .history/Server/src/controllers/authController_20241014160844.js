const authService = require("../services/authService");
const messages = require("../config/message.json");

const auth = {
  signup: async (req, res) => {
    try {
      const result = await authService.signup(req.body);
      return sendResponse(
        res,
        true, // Success
        messages.auth.signup.signupSuccess, // Lấy tiêu đề thành công từ message.json
        result.message // Nội dung phản hồi từ authService
      );
    } catch (error) {
      res.status(400).json({
        message: error.message || messages.general.internalServerError,
      });
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
