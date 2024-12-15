const express = require("express");
const axios = require("axios");
const config = require("../../../config/index");
const router = express.Router();
const FormData = require("form-data");
const profileController = require("../../controllers/profile/profileController");
const upload = require("../../middleware/upload");
const fs = require("fs");

// Địa chỉ URL của profile-service
const PROFILE_SERVICE_URL = config.service_host.profile;

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched profile data
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
 *                   example: "Profile fetched successfully"
 *                 description:
 *                   type: string
 *                   example: "Profile data retrieved successfully"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const token = req.headers["authorization"]; // Lấy token từ header
    const response = await axios.get(PROFILE_SERVICE_URL, {
      headers: { Authorization: token }, // Pass token to profile-service
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(error.response?.status || 500).json({
      success: false,
      title: "Error Fetching Profile",
      description:
        error.message || "An error occurred while fetching the profile",
    });
  }
});

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update current user profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ""
 *               phoneNumber:
 *                 type: string
 *                 example: ""
 *               about:
 *                 type: string
 *                 example: ""
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Avatar image
 *     responses:
 *       200:
 *         description: Successfully updated profile data
 *       400:
 *         description: Validation error or failed update
 *       500:
 *         description: Internal server error
 */
router.put(
  "/profile",
  upload.single("avatar"),
  profileController.updateProfile
);

module.exports = router;
