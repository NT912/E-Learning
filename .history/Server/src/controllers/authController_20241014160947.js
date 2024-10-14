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
        true,
        messages.auth.login.loginSuccess,
        result.message,
        { token: result.token }
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.auth.login.loginFailed,
        error.message || messages.general.internalServerError
      );
    }
  },
};

module.exports = auth;
