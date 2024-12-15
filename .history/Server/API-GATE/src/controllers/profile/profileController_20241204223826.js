const axios = require("axios");
const config = require("../config"); // Cấu hình URL của profile-service
const FormData = require("form-data"); // Sử dụng form-data để gửi file

const PROFILE_SERVICE_URL = config.service_host.profile;

const profileController = {
  updateProfile: async (req, res) => {
    try {
      const token = req.headers["authorization"];

      // Tạo form data để gửi dữ liệu (bao gồm file và các thông tin khác)
      const formData = new FormData();
      formData.append("avatar", req.file.buffer, req.file.originalname); // Đưa file vào formData
      formData.append("firstName", req.body.firstName);
      formData.append("lastName", req.body.lastName);
      formData.append("email", req.body.email);
      // Thêm các trường dữ liệu khác nếu cần

      const response = await axios.put(
        `${PROFILE_SERVICE_URL}/profile`,
        formData,
        {
          headers: {
            Authorization: token,
            ...formData.getHeaders(), // Thêm headers của formData để truyền đúng định dạng multipart
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
