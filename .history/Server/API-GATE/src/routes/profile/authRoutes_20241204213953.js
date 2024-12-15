const express = require("express");
const axios = require("axios");
const config = require("../../../config/index");
const router = express.Router();

// Địa chỉ URL của profile-service
const PROFILE_SERVICE_URL = config.service_host.profile;

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

// Update profile info (forward request to profile-service)
router.put("/", async (req, res) => {
  try {
    const token = req.headers["authorization"]; // Lấy token từ header
    const formData = req.body;

    const response = await axios.put(PROFILE_SERVICE_URL, formData, {
      headers: { Authorization: token }, // Pass token to profile-service
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(error.response?.status || 500).json({
      success: false,
      title: "Error Updating Profile",
      description:
        error.message || "An error occurred while updating the profile",
    });
  }
});

module.exports = router;
