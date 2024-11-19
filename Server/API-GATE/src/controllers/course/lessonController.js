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
    try {
      const user = req.user;
      const formData = new FormData();

      formData.append("userID", user.id);

      if (req.body.title) formData.append("title", req.body.title);
      if (req.body.description) formData.append("description", req.body.description);
      if (req.body.link) formData.append("link", req.body.link);

      if (req.file) {
        formData.append("file", req.file.buffer, req.file.originalname);
      }
      

      const response = await axios.post(
        `${COURSE_SERVICE_URL}/course/lesson/${lessonID}/update`,
        formData,
      );

      res.status(response.status).json(response.data || { message: "Lesson updated successfully." });
    } catch (error) {
      console.error("Error updating lesson:", error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error updating lesson.",
      });
    }
  },

  async allowDemo(req, res) {
    try {
      const { lessonID } = req.params;
      const userID = req.user.id;
  
      const response = await axios.patch(
        `${COURSE_SERVICE_URL}/course/lesson/${lessonID}/update/allowDemo`,
        { userID } 
      );
  
      res.status(response.status).json(response.data || { message: "Lesson updated successfully." });
    } catch (error) {
      console.error("Error updating lesson:", error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error updating lesson.",
      });
    }
  },

  async delete(req, res) {
    try {
      const { lessonID } = req.params;
      const userID = req.user.id;
  
      const response = await axios.delete(
        `${COURSE_SERVICE_URL}/course/lesson/${lessonID}/delete`,
        { userID } 
      );
  
      res.status(response.status).json(response.data || { message: "Lesson deleted successfully." });
    } catch (error) {
      console.error("Error delete lesson:", error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error delete lesson.",
      });
    }
  }
};

module.exports = courseApiController;
