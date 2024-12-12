const axios = require("axios");
const config = require("../config"); // Cấu hình URL của profile-service

const PROFILE_SERVICE_URL = config.service_host.profile;

const profileController = {
  updateProfile: async (req, res) => {
    try {
      const token = req.headers["authorization"]; // Lấy token từ header

      // Nếu có file avatar trong form, sử dụng FormData để gửi yêu cầu
      const formData = new FormData();
      // Append các trường dữ liệu từ req.body
      Object.keys(req.body).forEach((key) => {
        formData.append(key, req.body[key]);
      });

      // Nếu có avatar file, append vào FormData
      if (req.file) {
        formData.append("avatar", req.file.buffer, req.file.originalname); // Gửi file
      }

      // Gửi yêu cầu PUT tới profile-service
      const response = await axios.put(
        `${PROFILE_SERVICE_URL}/profile`,
        formData,
        {
          headers: {
            Authorization: token, // Gửi token trong header
            "Content-Type": "multipart/form-data", // Chỉ định Content-Type nếu có file
            ...formData.getHeaders(), // Đảm bảo FormData được xử lý đúng
          },
        }
      );

      // Trả lại phản hồi từ profile-service
      return res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Nếu có lỗi, trả lại thông báo lỗi chi tiết
      return res.status(error.response?.status || 500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

module.exports = profileController;
