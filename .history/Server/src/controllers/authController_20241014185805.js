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
        messages.auth.signup.title,
        result.message,
        result.user
      );
    } catch (error) {
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
