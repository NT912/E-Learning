const express = require("express");
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const profileValidation = require("../validation/profileValidation");

const router = express.Router();

/**
 * @route PUT /profile
 * @desc Update user profile
 * @access Private
 */
router.put(
  "/profile",
  authMiddleware.verifyToken,
  profileValidation.validateProfileUpdate,
  profileController.updateProfile
);

module.exports = router;
