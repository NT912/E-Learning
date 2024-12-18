const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for user authentication and management
 */

/**
 * @swagger
 * path:
 *  /auth/signup:
 *    post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *                - username
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  description: Email of the user
 *                  example: "user@example.com"
 *                password:
 *                  type: string
 *                  format: password
 *                  description: Password for the new user
 *                  example: "user1234"
 *                username:
 *                  type: string
 *                  description: Username for the user
 *                  example: "userName"
 *      responses:
 *        200:
 *          description: User registered successfully
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 */
router.post("/signup", AuthController.signup);

/**
 * @swagger
 * path:
 *  /auth/signupadmin:
 *    post:
 *      summary: Register a new admin user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *                - username
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  description: Email of the admin
 *                  example: "admin@example.com"
 *                password:
 *                  type: string
 *                  format: password
 *                  description: Password for the admin user
 *                  example: "admin123"
 *                username:
 *                  type: string
 *                  description: Username for the admin
 *                  example: "adminUser"
 *      responses:
 *        200:
 *          description: Admin user registered successfully
 *        400:
 *          description: Bad Request
 *        500:
 *          description: Internal Server Error
 */
router.post("/signupadmin", AuthController.signupAdmin);

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: User login
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  description: Email of the user
 *                  example: "user@example.com"
 *                password:
 *                  type: string
 *                  format: password
 *                  description: Password for the user
 *                  example: "user1234"
 *      responses:
 *        200:
 *          description: User logged in successfully
 *        400:
 *          description: Invalid credentials
 *        500:
 *          description: Internal Server Error
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * path:
 *  /auth/me:
 *    get:
 *      summary: Get current authenticated user details
 *      tags: [Auth]
 *      responses:
 *        200:
 *          description: User data fetched successfully
 *        401:
 *          description: Unauthorized, no token provided
 *        500:
 *          description: Internal Server Error
 */
router.get("/me", AuthController.getCurrentUser);

/**
 * @swagger
 * path:
 *  /auth/change-password:
 *    put:
 *      summary: Change password for current authenticated user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - oldPassword
 *                - newPassword
 *              properties:
 *                oldPassword:
 *                  type: string
 *                  format: password
 *                  description: Old password for the user
 *                  example: "oldPassword123"
 *                newPassword:
 *                  type: string
 *                  format: password
 *                  description: New password for the user
 *                  example: "newPassword123"
 *      responses:
 *        200:
 *          description: Password changed successfully
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized, no token provided
 *        500:
 *          description: Internal Server Error
 */
router.put("/change-password", AuthController.changePassword);

module.exports = router;
