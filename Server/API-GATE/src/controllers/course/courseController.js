const axios = require("axios");
const { request } = require("express");
const FormData = require("form-data");
const courseStatus = require("../../../config/data/courseState")

const config = require("../../../config/index")
const COURSE_SERVICE_URL = config.service_host.course; 

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

  async updateCourseStatus(req, res, status) {
    const { courseID } = req.params;

    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/status`, {
        userID: req.user.id,
        state: status,
      });
      res.status(response.status).json(response.data || { message: `${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()} course successfully.` });
    } catch (error) {
      console.error(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || `Error updating course status to ${status}.`,
      });
    }
  },

  confirmCourse(req, res) {
    return courseController.updateCourseStatus(req, res, courseStatus.CONFIRMED);
  },

  rejectCourse(req, res) {
    return courseController.updateCourseStatus(req, res, courseStatus.REJECTED);
  },

  approveCourse(req, res) {
    return courseController.updateCourseStatus(req, res, courseStatus.APPROVAL);
  },

  activeCourse(req, res) {
    return courseController.updateCourseStatus(req, res, courseStatus.ACTIVE);
  },

  blockCourse(req, res) {
    return courseController.updateCourseStatus(req, res, courseStatus.BLOCKED);
  },

  async updateCourseDescription(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/description`, {
        userID: req.user.id,
        content: req.body.content
      });
      res.status(response.status).json(response.data || { message: "Updated description of course successfully." });
    }  catch (error) {
      console.error(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || `Error updating description`,
      });
    }
  },

  async updateCourseCost(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/cost`,{
        userID: req.user.id,
        amount: req.body.amount
      });
      res.status(response.status).json(response.data || { message: "Updated cost of course successfully." });
    } catch (error) {
      console.error(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || `Error updating cost`,
      });
    }
  },

  async updateCourseLevel(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/level`, {
        userID: req.user.id,
        level: req.body.level
      });
      res.status(response.status).json(response.data || { message: "Updated level of course successfully." });
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || `Error updating level`,
      });
    }
  },

  async updateCategory(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.patch(`${COURSE_SERVICE_URL}/course/${courseID}/update/category`, {
        userID: req.user.id,
        categoryID: req.body.categoryID
      });
      res.status(response.status).json(response.data || { message: "Updated category of course successfully." });
    } catch (error) {
        console.error(error.response?.data);
        res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || `Error updating lecategoryvel`,
      });
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
