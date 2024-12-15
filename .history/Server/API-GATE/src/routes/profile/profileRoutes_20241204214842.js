const express = require("express");
const axios = require("axios");
const config = require("../../../config/index");
const router = express.Router();

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
 * /profile:
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
 *                 example: "johndoe@example.com"
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567890"
 *               about:
 *                 type: string
 *                 example: "Hello, I am John Doe."
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
router.put("/", async (req, res) => {
  try {
    // Lấy token từ headers
    const token = req.headers["authorization"];

    // Lấy dữ liệu từ body yêu cầu
    const { email, phoneNumber, about, avatar } = req.body;

    // Kiểm tra dữ liệu đầu vào, bạn có thể thêm điều kiện nếu cần thiết
    if (!email && !phoneNumber && !about) {
      return res.status(400).json({
        success: false,
        title: "Invalid Request",
        description:
          "Please provide at least one field (email, phoneNumber, or about).",
      });
    }

    // Dữ liệu sẽ được gửi theo định dạng JSON
    const payload = {
      email,
      phoneNumber,
      about,
      avatar,
    };

    // Gửi PUT request tới profile-service
    const response = await axios.put("http://localhost:3006/profile", payload, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json", // Đảm bảo gửi dữ liệu dạng JSON
      },
    });

    // Trả về response của profile-service
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response ? error.response.data : error.message
    );
    res.status(error.response?.status || 500).json({
      success: false,
      title: "Error Updating Profile",
      description:
        error.response?.data?.description ||
        "An error occurred while updating the profile",
    });
  }
});

module.exports = router;
