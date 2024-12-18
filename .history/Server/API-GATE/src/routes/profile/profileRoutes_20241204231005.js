const express = require("express");
const axios = require("axios");
const config = require("../../../config/index");
const router = express.Router();
const FormData = require("form-data");
const profileController = require("../../controllers/profile/profileController");
const upload = require("../../middleware/upload");
const authMiddleware = require("../../middleware/authMiddleware");
const profileValidation = require("../../validation/profile/profileValidation");
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
 * /profile:
 *   put:
 *     summary: Cập nhật thông tin profile người dùng
 *     description: Cập nhật thông tin cá nhân của người dùng, bao gồm cả avatar (hình ảnh đại diện).
 *     operationId: updateProfile
 *     tags:
 *       - Profile
 *     requestBody:
 *       description: Dữ liệu profile cần cập nhật, bao gồm avatar mới (nếu có)
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Địa chỉ email của người dùng
 *                 example: john.doe@example.com
 *               phoneNumber:
 *                 type: string
 *                 description: Số điện thoại của người dùng
 *                 example: "1234567890"
 *               about:
 *                 type: string
 *                 description: Mô tả về người dùng
 *                 example: "Giới thiệu bản thân"
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh đại diện của người dùng (nếu có thay đổi)
 *                 example: /path/to/avatar.jpg
 *     responses:
 *       '200':
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 avatarUrl:
 *                   type: string
 *                   description: URL của avatar mới (nếu có)
 *                   example: "https://firebase_storage_url/avatar.jpg"
 *       '400':
 *         description: Yêu cầu không hợp lệ (invalid data)
 *       '401':
 *         description: Không có quyền truy cập (unauthorized)
 *       '500':
 *         description: Lỗi server (internal server error)
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/",
  upload.single("avatar"), // Nhận file ảnh từ form
  profileValidation.validateProfileUpdate,
  async (req, res, next) => {
    try {
      let avatarUrl = req.body.avatar; // Nếu không có avatar mới, giữ lại URL cũ

      // Nếu có ảnh mới, tiến hành upload lên Firebase Storage
      if (req.file) {
        avatarUrl = await firebaseHelper.uploadAvatarUser(req.file); // Upload avatar lên Firebase và lấy URL
      }

      // Tiến hành cập nhật profile với avatar URL đã được upload
      // Gọi hàm cập nhật profile trong controller tại đây
      profileController.updateProfile(req, res, avatarUrl);
    } catch (error) {
      next(error); // Gửi lỗi nếu có vấn đề trong quá trình upload
    }
  }
);

module.exports = router;
