const express = require("express");
const authController = require("../../controllers/auth/authController");
const { checkAuth } = require("../../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for authentication and authorization
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       description: User registration information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /auth/signupadmin:
 *   post:
 *     summary: Sign up a new admin
 *     tags: [Auth]
 *     requestBody:
 *       description: Admin registration information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/signupadmin", authController.signupAdmin);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns a token
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/adminlogin:
 *   post:
 *     summary: Login an admin
 *     tags: [Auth]
 *     requestBody:
 *       description: Admin login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin login successful, returns a token
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/adminlogin", authController.adminLogin);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Token is missing or invalid
 *       500:
 *         description: Internal server error
 */
router.post("/logout", checkAuth, authController.logout);

/**
 * @swagger
 * /auth/verify-token:
 *   post:
 *     summary: Verify the user's token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Token to verify
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Token is missing or invalid
 *       403:
 *         description: Token is expired
 *       500:
 *         description: Internal server error
 */
router.post("/verify-token", authController.verifyToken);

module.exports = router;
