const authService = require("../services/authService");
const sendResponse = require("../helpers/sendResponse");
const messages = require("../../config/message.json");
const { addTokenToBlacklist } = require("../helpers/blacklist");
const jwt = require("jsonwebtoken");

const auth = {
  signup: async (req, res) => {
    try {
      const result = await authService.signup(req.body);
      return sendResponse(
        res,
        true,
        messages.auth.signupSuccess.title,
        result.message,
        result.user
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.auth.signupError.title,
        error.message || messages.auth.signupError.description.signupFailed
      );
    }
  },

  signupAdmin: async (req, res) => {
    try {
      onst requestData = {
      ...req.body,
      role: 'admin',  // Đặt role mặc định là 'admin'
    };
      const result = await authService.signupAdmin(req.body);
      return sendResponse(
        res,
        true,
        messages.auth.signupSuccess.title,
        result.message,
        result.user
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.auth.signupError.title,
        error.message || messages.auth.signupError.description.signupFailed
      );
    }
  },

  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      return sendResponse(res, true, messages.auth.loginSuccess.title, {
        token: result.token,
      });
    } catch (error) {
      console.log("Login error:", error);
      return sendResponse(
        res,
        false,
        messages.auth.loginError.title,
        error.message || messages.auth.loginError.description.loginFailed
      );
    }
  },
  //
  adminLogin: async (req, res) => {
    try {
      const result = await authService.adminLogin(req.body);
      return sendResponse(res, true, messages.auth.loginSuccess.title, {
        token: result.token,
      });
    } catch (error) {
      console.error("Login Error:", error);
      return sendResponse(
        res,
        false,
        messages.auth.loginError.title,
        error.message || messages.auth.loginError.description.loginFailed
      );
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.header("Authorization").split(" ")[1];
      if (!token) {
        return res.status(401).json(messages.auth.token.description.missToken);
      }

      addTokenToBlacklist(token);

      return sendResponse(
        res,
        true,
        messages.auth.logoutSuccess.title,
        messages.auth.logoutSuccess.description
      );
    } catch (error) {
      console.log("Logout Error:", error);
      return sendResponse(
        res,
        false,
        messages.auth.logoutError.title,
        messages.auth.logoutError.description
      );
    }
  },

  verifyToken: (req, res) => {
    const token = req.header("Authorization");

    console.log(token);

    if (!token) {
      return res.status(401).json({
        message:
          "Token is missing. Please provide a token to access this resource.",
      });
    }

    const tokenParts = token.split(" ");
    if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
      return res.status(401).json({
        message:
          "Invalid token format. Token must be in the format 'Bearer <token>'.",
      });
    }

    const actualToken = tokenParts[1];

    try {
      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
      res.status(200).json({
        message: "Token is valid",
        user: decoded,
      });
    } catch (err) {
      console.log(err);
      return res.status(403).json({
        message: "Token is invalid or has expired. Please login again.",
      });
    }
  },
};

module.exports = auth;
