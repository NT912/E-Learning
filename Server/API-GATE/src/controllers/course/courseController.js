const axios = require("axios");
const CourseStatus = require("../../../config/");

const courseController = {
  createCourse: async (req, res) => {
    const user = req.user;
    
    try {
      const response = await axios.post("http://localhost:3004/courses", {
        userId: user.id,
      });
      res.status(201).json({
        courseID: response.data.courseID,
      });
    } catch (err) {
      res.status(400).json({
        error: err.response ? err.response.data : err.message,
      });
    }
  },

  updateCourseName: async (req, res) => {
    const { courseID } = req.params;
    const name = req.body.courseName;
    const user = req.user;

    try {
      await axios.put(`http://localhost:3004/courses/${courseID}/name`, {
        userId: user.id,
        name: name,
      });
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.response ? err.response.data : err.message,
      });
    }
  },

  updateCourseAvatar: async (req, res) => {
    const { courseID } = req.params;
    const user = req.user;
    const file = req.file;

    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("avatar", file.buffer, file.originalname);
      
      await axios.put(`http://localhost:3004/courses/${courseID}/avatar`, formData, {
        headers: formData.getHeaders(),
      });
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.response ? err.response.data : err.message,
      });
    }
  },

  updateCourseShortcut: async (req, res) => {
    const { courseID } = req.params;
    const { content } = req.body;
    const user = req.user;

    try {
      await axios.put(`http://localhost:3004/courses/${courseID}/shortcut`, {
        userId: user.id,
        content: content,
      });
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.response ? err.response.data : err.message,
      });
    }
  },

  updateCourseDescription: async (req, res) => {
    const { courseID } = req.params;
    const { content } = req.body;
    const user = req.user;

    try {
      await axios.put(`http://localhost:3004/courses/${courseID}/description`, {
        userId: user.id,
        content: content,
      });
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.response ? err.response.data : err.message,
      });
    }
  },

  updateCourseCost: async (req, res) => {
    const { courseID } = req.params;
    const { amount } = req.body;
    const user = req.user;

    try {
      await axios.put(`http://localhost:3004/courses/${courseID}/cost`, {
        userId: user.id,
        amount: amount,
      });
      res.status(200).json("Course cost updated successfully");
    } catch (err) {
      res.status(400).json({
        error: err.response ? err.response.data : err.message,
      });
    }
  },

  confirm: async (req, res) => {
    const { courseID } = req.params;
    const user = req.user;
    try {
      await axios.put(`http://localhost:3004/courses/${courseID}/status`, {
        userId: user.id,
        status: CourseStatus.CONFIRMED,
      });
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.response ? err.response.data : err.message,
      });
    }
  },
};

module.exports = courseController;
