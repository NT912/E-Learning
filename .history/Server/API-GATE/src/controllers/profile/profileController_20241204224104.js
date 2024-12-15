const axios = require("axios");
const FormData = require("form-data");
const config = require("../config"); // Cấu hình URL của profile-service

const PROFILE_SERVICE_URL = config.service_host.profile;

const profileController = {
  updateProfile: async (req, res) => {
    try {
      const token = req.headers["authorization"];

      // Tạo FormData để gửi dữ liệu (bao gồm file và các thông tin khác)
      const formData = new FormData();
      if (req.file) {
        formData.append("avatar", req.file.buffer, req.file.originalname); // Đưa file vào formData
      }
      formData.append("email", req.body.email || "");
      formData.append("phoneNumber", req.body.phoneNumber || "");
      formData.append("about", req.body.about || "");
      formData.append("bankName", req.body.bankName || "");
      formData.append("bankAccountNumber", req.body.bankAccountNumber || "");

      // Gửi yêu cầu PUT đến Profile Service
      const response = await axios.put(
        `${PROFILE_SERVICE_URL}/profile`,
        formData,
        {
          headers: {
            Authorization: token, // Token xác thực người dùng
            ...formData.getHeaders(), // Đảm bảo truyền đúng headers cho multipart
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
