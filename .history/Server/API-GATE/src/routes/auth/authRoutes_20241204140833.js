// src/routes/authRoutes.js

const express = require("express");
const axios = require("axios");
const { AUTH_SERVICE_URL } = require("../../../config/index");
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     description: This endpoint allows users to sign up by providing necessary details like name, email, and password.
 *     operationId: signUp
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: This endpoint allows users to log in by providing their email and password.
 *     operationId: login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login with token and user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       '400':
 *         description: Bad request, invalid email or password
 *       '500':
 *         description: Internal Server Error
 */
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
    const token = req.headers["authorization"]; // Lấy token từ header
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
    const token = req.headers["authorization"]; // Lấy token từ header
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