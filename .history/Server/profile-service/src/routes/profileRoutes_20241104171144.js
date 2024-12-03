const express = require("express");
const multer = require("multer");
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const profileValidation = require("../validation/profileValidation");

const router = express.Router();
const upload = multer();

/**
 * @route PUT /profile
 * @desc Update user profile
 * @access Private
 */

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []  # Require Bearer Token in Authorization header
 *     requestBody:
 *       description: Update profile information including optional avatar upload
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Updated email address
 *                 example: "johndoe@example.com"
 *               phoneNumber:
 *                 type: string
 *                 description: Updated phone number
 *                 example: "1234567890"
 *               about:
 *                 type: string
 *                 description: Information about the user
 *                 example: "Hello, I am John Doe and I love programming."
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Upload avatar image file
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *                   example: "Profile updated successfully"
 *                 description:
 *                   type: string
 *                   example: "Your profile information has been updated."
 *                 data:
 *                   type: object
 *                   description: Updated profile data
 *       400:
 *         description: Validation error or failed update
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
 *                   example: "Validation Error"
 *                 description:
 *                   type: string
 *                   example: "Invalid email format, About section cannot exceed 500 characters."
 *       401:
 *         description: Unauthorized - Missing or invalid token
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
 *                   example: "Authorization Error"
 *                 description:
 *                   type: string
 *                   example: "Authorization token is required."
 *       500:
 *         description: Server error during profile update
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
 *                   example: "Profile Update Failed"
 *                 description:
 *                   type: string
 *                   example: "There was an error updating your profile. Please try again."
 */
router.put(
  "/profile",
  authMiddleware.verifyToken,
  upload.single("avatar"),
  profileValidation.validateProfileUpdate,
  profileController.updateProfile
);

module.exports = router;
