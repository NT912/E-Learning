const express = require("express");
const axios = require("axios");
const config = require("../../../config/index");
const router = express.Router();

// Địa chỉ URL của profile-service
const PROFILE_SERVICE_URL = config.service_host.profile;

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
 *       400:
 *         description: Validation error or failed update
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Server error during profile update
 */
router.put("/profile", async (req, res) => {
  try {
    // Đảm bảo Authorization token đã được truyền
    const token = req.headers["authorization"];

    // Gọi đến profile-service
    const response = await axios.put(
      `${PROFILE_SERVICE_URL}/profile/profile`,
      req.body,
      {
        headers: {
          Authorization: token, // Truyền Authorization token đến service
        },
      }
    );

    // Trả về kết quả từ profile-service
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
