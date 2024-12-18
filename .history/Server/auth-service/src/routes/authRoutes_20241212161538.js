const express = require("express");
const authController = require("../controllers/authController");
const {
  validateSignup,
  validateLogin,
} = require("../validation/authValidation");
const authMiddleware = require("../middleware/authMiddleware");

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
 *               role:
 *                 type: string
 *                 description: role
 *                 example: "teacher"
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
 * /auth/admin/signup:
 *   post:
 *     summary: Admin sign up
 *     description: This endpoint allows an admin to sign up by providing the necessary details such as email, password, and role.
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
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 description: The role of the user (should be 'admin' for admin sign up).
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       '200':
 *         description: Admin registered successfully
 *       '400':
 *         description: Bad request, invalid data
 *       '500':
 *         description: Internal Server Error
 */
router.post("/admin/signup", authController.adminSignup);

/**
 * @swagger
 * /auth/admin/signup:
 *   post:
 *     summary: Admin signup
 *     tags: [Auth]
 *     requestBody:
 *       description: Admin information for signup
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email for the admin account
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the admin account
 *                 example: "admin123"
 *               username:
 *                 type: string
 *                 description: Username for the admin account
 *                 example: "adminUser"
 *     responses:
 *       201:
 *         description: Admin account created successfully
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
 *                   example: "Signup successful"
 *                 description:
 *                   type: string
 *                   example: "Admin account has been created successfully."
 *                 data:
 *                   type: object
 *                   description: The newly created admin user data
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: The email of the admin
 *                       example: "admin@example.com"
 *                     username:
 *                       type: string
 *                       description: The username of the admin
 *                       example: "adminUser"
 *                     role:
 *                       type: string
 *                       description: The role of the user (always 'admin' for this endpoint)
 *                       example: "admin"
 *       400:
 *         description: Invalid input or missing fields
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
 *                   example: "Invalid Input"
 *                 description:
 *                   type: string
 *                   example: "Required fields are missing or invalid."
 *       409:
 *         description: Email already exists
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
 *                   example: "Email already exists"
 *                 description:
 *                   type: string
 *                   example: "An account with this email already exists."
 */
router.post("/admin/signup", validateSignup, authController.signupAdmin);

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
 * /auth/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       description: Admin credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Admin email
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Admin password
 *                 example: "admin123"
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
router.post("/admin/login", validateLogin, authController.adminLogin);

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

/**
 * @swagger
 * /auth/verify-token:
 *   get:
 *     summary: Verify the JWT token for authentication
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     description: Validates if the provided JWT token is valid or expired. The token should be sent in the Authorization header as `Bearer <token>`.
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *                 user:
 *                   type: object
 *                   description: Decoded user information from the token
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "user"
 *       401:
 *         description: Missing or invalid token format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is missing. Please provide a token to access this resource.
 *       403:
 *         description: Token is invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is invalid or has expired. Please login again.
 */
router.get("/verify-token", authController.verifyToken);

module.exports = router;
