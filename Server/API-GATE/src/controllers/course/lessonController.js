const axios = require("axios");

const config = require("../../../config/index")
const COURSE_SERVICE_URL = config.service_host.course; 

const courseApiController = {
  async createLesson(req, res) {
    const { chapterID } = req.params;
    try {
      const user = req.user;
      const response = await axios.post(`${COURSE_SERVICE_URL}/course/lesson/create`, 
        { 
          chapterID: chapterID,
          userID: user.id 
        }
      );
      res.status(response.status).json(response.data || { message: "Create chapter success." });
    } catch (error) {
      console.log(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error create chapter.",
      });
    }
  },

  async updateLesson(req, res) {
    const { lessonID } = req.params;
    const userID = req.user.id;
    
    try {
      // Tạo form data để gửi tệp và các thông tin khác
      const formData = new FormData();
      formData.append("userID", userID);
      formData.append("title", req.body.title);
      formData.append("description", req.body.description || "");

      // Nếu có file, thêm file vào form data
      if (req.file) {
        formData.append("file", req.file.buffer, req.file.originalname);
      }

      // Nếu có link, thêm link vào form data
      if (req.body.link) {
        formData.append("link", req.body.link);
      }

      // Gửi yêu cầu tới course-service
      const response = await axios.post(
        `${COURSE_SERVICE_URL}/course/lesson/${lessonID}/update`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: req.header("Authorization"),
          },
        }
      );

      res.status(response.status).json(response.data || { message: "Lesson updated successfully." });
    } catch (error) {
      console.error("Error updating lesson:", error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error updating lesson.",
      });
    }
  },
};

module.exports = courseApiController;
