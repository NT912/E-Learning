const axios = require("axios");
const config = require("../../config/index");
const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../helpers/blacklist");
const messages = require("../../config/message.json");

const AUTH_SERVICE_URL = config.service_host.auth;

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const token = req.header("Authorization");

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

    // Kiểm tra xem token có bị blacklist không
    if (isTokenBlacklisted(actualToken)) {
      return res.status(403).json({
        message: "Token is blacklisted. Please login again.",
      });
    }

    try {
      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
      req.user = decoded; // Lưu thông tin user trong request
      next(); // Tiếp tục xử lý request
    } catch (err) {
      return res.status(403).json({
        message: "Token is invalid or has expired. Please login again.",
      });
    }
  },

  loginRequire: async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Login require",
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
      const response = await axios.get(
        `${AUTH_SERVICE_URL}/auth/verify-token`,
        {
          headers: { Authorization: `Bearer ${actualToken}` },
        }
      );

      req.user = response.data.user;
      next();
    } catch (error) {
      console.log(error);
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Error verifying token";
      return res.status(status).json({ message });
    }
  },

  studentRequire: async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Login require",
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
      const response = await axios.get(
        `${AUTH_SERVICE_URL}/auth/verify-token`,
        {
          headers: { Authorization: `Bearer ${actualToken}` },
        }
      );

      if (response.data.user.role != "student")
        return res.status(401).json({
          message: "User must be student",
        });
      req.user = response.data.user;
      next();
    } catch (error) {
      console.log(error);
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Error verifying token";
      return res.status(status).json({ message });
    }
  },

  techerRequire: async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Login require",
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
      const response = await axios.get(
        `${AUTH_SERVICE_URL}/auth/verify-token`,
        {
          headers: { Authorization: `Bearer ${actualToken}` },
        }
      );

      if (response.data.user.role == "student")
        return res.status(401).json({
          message: "User must be teacher",
        });
      req.user = response.data.user;
      next();
    } catch (error) {
      console.log(error);
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Error verifying token";
      return res.status(status).json({ message });
    }
  },

  adminRequire: async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Login require",
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
      const response = await axios.get(
        `${AUTH_SERVICE_URL}/auth/verify-token`,
        {
          headers: { Authorization: `Bearer ${actualToken}` },
        }
      );

      if (response.data.user.role != "admin")
        return res.status(401).json({
          message: "User must be admin",
        });
      req.user = response.data.user;
      next();
    } catch (error) {
      console.log(error);
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Error verifying token";
      return res.status(status).json({ message });
    }
  },
};

module.exports = authMiddleware;
