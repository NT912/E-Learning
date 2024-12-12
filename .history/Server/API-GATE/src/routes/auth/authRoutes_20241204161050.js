// src/routes/authRoutes.js

const express = require("express");
const axios = require("axios");
const config = require("../../../config/index");
const router = express.Router();

const AUTH_SERVICE_URL = config.service_host.auth;

/**
 * @swagger
 * /auth/signup:
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
    console.log(
      "Calling signup API with URL:",
      `${AUTH_SERVICE_URL}/auth/signup`
    );
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/signup`,
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /auth/login:
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
// Route cho login
router.post("/login", async (req, res) => {
  try {
    console.log(
      "Calling signup API with URL:",
      `${AUTH_SERVICE_URL}/auth/login`
    );
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/login`,
      req.body
    );
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
 * /auth/admin/login:
 *   post:
 *     summary: Admin login
 *     description: This endpoint allows admins to log in by providing their admin credentials (email and password).
 *     operationId: adminLogin
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
 *                 description: Admin's email address
 *               password:
 *                 type: string
 *                 description: Admin's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful admin login with token and admin details
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
    console.log(
      "Calling signup API with URL:",
      `${AUTH_SERVICE_URL}/auth/admin/login`
    );
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/admin/login`,
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

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: This endpoint logs out the user by invalidating the provided JWT token.
 *     operationId: userLogout
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: {}
 *     responses:
 *       '200':
 *         description: Successful logout, token invalidated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *       '400':
 *         description: Bad request, missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authorization token is required"
 *       '401':
 *         description: Unauthorized, invalid token or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid token or token has expired"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
// Route cho logout
router.post("/logout", async (req, res) => {
  try {
    console.log(
      "Calling signup API with URL:",
      `${AUTH_SERVICE_URL}/auth/admin/login`
    );
    const token = req.headers["authorization"];
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/logout`,
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

/**
 * @swagger
 * /auth/verify-token:
 *   get:
 *     summary: Verify a JWT token
 *     description: This endpoint is used to verify the validity of the provided JWT token.
 *     operationId: verifyToken
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: The JWT token to verify (in the format 'Bearer <token>').
 *         schema:
 *           type: string
 *           example: "Bearer your-jwt-token-here"
 *     responses:
 *       '200':
 *         description: Token is valid and verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is valid"
 *       '401':
 *         description: Unauthorized, invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid token or token has expired"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
// Route cho verify token
router.get("/verify-token", async (req, res) => {
  try {
    const token = req.headers["authorization"]; // Lấy token từ header
    const response = await axios.get(`${AUTH_SERVICE_URL}/auth/verify-token`, {
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
