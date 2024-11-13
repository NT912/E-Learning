const axios = require("axios");
const { request } = require("express");
const FormData = require("form-data");
const courseStatus = require("../../../config/data/courseState")
const COURSE_SERVICE_URL = "http://localhost:3004"; 

const courseApiController = {
  async createCourse(req, res) {
    try {
      const user = req.user;
      const response = await axios.post(`${COURSE_SERVICE_URL}/course/create`, 
        { 
          userID: user.id 
        }
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  async getCourseDetails(req, res) {
    const { courseID } = req.params;
    const { userID } = req.query;
    try {
      const response = await axios.get(`${COURSE_SERVICE_URL}/course/${courseID}/details`, {
        params: { userID }
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  async updateCourseName(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/name`, {
        userID: req.user.id, 
        courseName: req.body.courseName,
      });

      res.status(response.status).json(response.data || { message: "Course name updated successfully." });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error updating course name.",
      });
    }
  },

  async updateCourseAvatar(req, res) {
    const { courseID } = req.params;
    const userID = req.user.id; 

    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    try {
      const response = await axios.patch(
        `${COURSE_SERVICE_URL}/course/${courseID}/update/avatar`,
        formData,
      );

      res.status(response.status).json(response.data || { message: "Course avatar updated successfully." });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error updating course avatar.",
      });
    }
  },

  async updateCourseShortcut(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/shortcut`, {
        userID: req.user.id,
        content: req.body.content
      });
      res.status(response.status).json(response.data || { message: "Course shortcut updated successfully." });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error updating course shortcut.",
      });
    }
  },

  async confirmCourse(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/status`, {
        userID: req.user.id,
        state: courseStatus.CONFIRMED
      });
      res.status(response.status).json(response.data || { message: "Conrim course successfully." });
    } catch (error) {
      console.log(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error confirming course.",
      });
    }
  },

  async updateCourseDescription(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/description`, req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  async updateCourseCost(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/cost`, req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  async updateCourseLevel(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update-level`, req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  async updateCourseStatus(req, res) {
    const { courseID } = req.params;
    const { state } = req.query;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update-status`, null, {
        params: { state },
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const response = await axios.get(`${COURSE_SERVICE_URL}/course/getall`, {
        params: req.query,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },
};

module.exports = courseApiController;
