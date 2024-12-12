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
router.post("/signup", authController.signup);

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
router.post("/login", authController.login);

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
router.post("/admin/login", authController.adminLogin);

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
router.post("/logout", authController.logout);

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
router.get("/verify-token", authController.verifyToken);

module.exports = router;
