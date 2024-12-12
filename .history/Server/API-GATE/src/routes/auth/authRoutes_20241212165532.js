const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/authController");

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *       '400':
 *         description: Bad request, invalid data or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /auth/admin/signup:
 *   post:
 *     summary: Admin sign up
 *     description: This endpoint allows an admin to sign up by providing the necessary details such as name, email, and password. The role will be automatically set to 'admin'.
 *     operationId: adminSignup
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
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *       '400':
 *         description: Bad request, invalid data or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post("/admin/signup", authController.adminSignup);

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
 *               password:
 *                 type: string
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
 *                 description:
 *                   type: string
 *       '400':
 *         description: Bad request, invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *                 error:
 *                   type: string
 */
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
 *               password:
 *                 type: string
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
 *                 description:
 *                   type: string
 *       '400':
 *         description: Bad request, invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *                 error:
 *                   type: string
 */
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
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '400':
 *         description: Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *                 error:
 *                   type: string
 */
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
 *         description: Token is valid
 *       '401':
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get("/verify-token", authController.verifyToken);

module.exports = router;
