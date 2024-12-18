const axios = require("axios");
const FormData = require("form-data"); // Đảm bảo import FormData
const config = require("../config"); // Cấu hình URL của profile-service

const PROFILE_SERVICE_URL = config.service_host.profile;

const profileController = {
  updateProfile: async (req, res) => {
    try {
      const token = req.headers["authorization"]; // Lấy token từ header

      // Tạo FormData
      const formData = new FormData();

      // Append các trường dữ liệu từ req.body vào formData
      Object.keys(req.body).forEach((key) => {
        formData.append(key, req.body[key]);
      });

      // Nếu có avatar file, append vào FormData
      if (req.file) {
        formData.append("avatar", req.file.buffer, req.file.originalname); // Gửi file avatar
      }

      // Gửi yêu cầu PUT tới profile-service
      const response = await axios.put(
        `${PROFILE_SERVICE_URL}/profile`,
        formData,
        {
          headers: {
            Authorization: token, // Gửi token trong header
            "Content-Type": "multipart/form-data", // Chỉ định Content-Type là multipart/form-data
            ...formData.getHeaders(), // Đảm bảo FormData được xử lý đúng
          },
        }
      );

      // Trả lại phản hồi từ profile-service
      return res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      console.error("Error response:", error.response?.data);

      // Nếu có lỗi, trả lại thông báo lỗi chi tiết
      return res.status(error.response?.status || 500).json({
        message: "Internal Server Error",
        error: error.message,
        response: error.response?.data || null, // Xem thêm chi tiết từ lỗi
      });
    }
  },
};

module.exports = profileController;
