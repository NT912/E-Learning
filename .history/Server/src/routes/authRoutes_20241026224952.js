const express = require("express");
const authController = require("../controllers/authController");
const {
  validateSignup,
  validateLogin,
} = require("../validation/authValidation");

const router = express.Router();

/**
 * @swagger
 * /signup:
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
router.post("/login", validateLogin, authController.login);

module.exports = router;
