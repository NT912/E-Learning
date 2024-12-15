// src/routes/authRoutes.js

const express = require("express");
const axios = require("axios");
const router = express.Router();

// URL của auth-service (Giả sử auth-service chạy ở port 5000)
const AUTH_SERVICE_URL = "http://localhost:5000/api/auth";

// Route cho signup
router.post("/signup", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/signup`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Route cho login
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Route cho admin login
router.post("/admin/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/admin/login`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Route cho logout
router.post("/logout", async (req, res) => {
  try {
    const token = req.headers["authorization"]; // Giả sử token gửi trong header Authorization
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/logout`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Route cho verify token
router.get("/verify-token", async (req, res) => {
  try {
    const token = req.headers["authorization"]; // Giả sử token gửi trong header Authorization
    const response = await axios.get(`${AUTH_SERVICE_URL}/verify-token`, {
      headers: { Authorization: token },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
