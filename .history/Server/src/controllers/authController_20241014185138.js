const authService = require("../services/authService");

const auth = {
  signup: async (req, res) => {
    try {
      console.log(hello);
      await authService.signup(req.body, res);
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
