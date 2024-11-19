const express = require("express");
const authController = require("../controllers/authController");
const {
  validateSignup,
  validateLogin,
} = require("../validation/authValidation");

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     requestBody:
 *       description: User information for signup
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username for the new account
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email for the new account
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the new account
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or missing fields
 *       409:
 *         description: Email or username already exists
 */
router.post("/signup", validateSignup, authController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid input or missing fields
 *       401:
 *         description: Unauthorized - Incorrect email or password
 */
router.post("/login", validateLogin, authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       200:
 *         description: Logout successful, user token has been invalidated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 title:
 *                   type: string
 *                   example: "Logout successful"
 *                 description:
 *                   type: string
 *                   example: "You have been successfully logged out."
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Token fail"
 *                 description:
 *                   type: string
 *                   example: "Require Token."
 *       403:
 *         description: Token is blacklisted or failed decoding
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Token fail"
 *                 description:
 *                   type: string
 *                   example: "Fail decode Token."
 */
router.post("/logout", authMiddleware.verifyToken, authController.logout);

module.exports = router;
