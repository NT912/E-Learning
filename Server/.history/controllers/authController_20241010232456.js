const authService = require("../services/authService");
import { authService } from "~/services/authService";

exports.signup = (req, res) => {
  authService.signup(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    res.status(201).send(result);
  });
};

exports.login = (req, res) => {
  authService.login(req.body, (err, token) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ token });
  });
};
