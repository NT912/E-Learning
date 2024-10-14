const authService = require("../services/authService");
const { messages } = require("../config/message.json");

const auth = {
  signup: async (req, res) => {
    try {
      const result = await authService.signup(req.body);
      res.status(201).json({ message: result.message });
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
