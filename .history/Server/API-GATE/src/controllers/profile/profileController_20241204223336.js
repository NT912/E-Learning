const axios = require("axios");
const config = require("../config"); // Cấu hình URL của profile-service

const PROFILE_SERVICE_URL = config.service_host.profile;

const profileController = {
  updateProfile: async (req, res) => {
    try {
      console.log("Request body received at API Gateway:", req.body); // Log dữ liệu gửi tới từ client

      const token = req.headers["authorization"];
      const response = await axios.put(
        `${PROFILE_SERVICE_URL}/profile`,
        req.body, // Dữ liệu gửi sang service
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(error.response?.status || 500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

module.exports = profileController;
