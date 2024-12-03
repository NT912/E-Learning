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
router.put(
  "/profile",
  authMiddleware.verifyToken,
  upload.single("avatar"), // xử lý file "avatar" từ form
  profileValidation.validateProfileUpdate,
  profileController.updateProfile
);

module.exports = router;
