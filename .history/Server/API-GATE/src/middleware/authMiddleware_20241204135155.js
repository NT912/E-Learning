const axios = require("axios");
const config = require("../../config/index");
const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../helpers/blacklist");

const AUTH_SERVICE_URL = config.service_host.auth;

const authMiddleware = {
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
