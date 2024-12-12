const axios = require("axios");
const config = require("../config"); // Cấu hình URL của profile-service

const PROFILE_SERVICE_URL = config.service_host.profile;

const profileController = {
  updateProfile: async (req, res) => {
    try {
      const token = req.headers["authorization"];

      // Log ra để kiểm tra dữ liệu từ frontend
      console.log("Data received in API Gateway:", req.body);

      // Gửi thông tin lên Profile Service, bao gồm cả link ảnh
      const response = await axios.put(
        `${PROFILE_SERVICE_URL}/profile`,
        req.body, // Gửi nguyên dữ liệu, không cần phải xử lý ảnh nữa
        {
          headers: {
            Authorization: token,
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
