const authService = require("../services/authService");

const auth = {
  signup: async (req, res) => {
    try {
      await authService.signup(req.body, res);
      // Kiểm tra Email trống
      if (userData.email === null) {
        console.log(userData.email);
        return sendResponse(
          res,
          false,
          messages.auth.signup.title,
          messages.auth.signup.description.noneEmail
        );
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  login: async (req, res) => {
    try {
      await authService.login(req.body, res);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = auth;
