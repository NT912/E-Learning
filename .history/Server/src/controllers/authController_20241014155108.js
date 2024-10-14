const authService = require("../services/authService");
const messages = require("../messages/massage.json");

const auth = {
  signup: async (req, res) => {
    try {
      const result = await authService.signup(req.body);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const token = await authService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = auth;
