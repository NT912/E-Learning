const courseService = require("../services/courseService");
const CourseStatus = require("../../config/data/courseState");

const courseController = {
  createCourse: async (req, res) => {
    const { userID } = req.body;
    
    try {
      const result = await courseService.create(userID);
      res.status(201).json({
        courseID: result
      });
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },

   /**
   * Get detailed course information
   */
   getCourseDetails: async (req, res) => {
    const { courseID } = req.params;
    const { userID } = req.query; // Get userID from query parameter

    try {
      const courseDetails = await courseService.getCourseDetails(courseID, userID);
      res.status(200).json(courseDetails);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateCourseName: async (req, res) => {
    const { courseID } = req.params;
    const { userID, courseName: name } = req.body;

    try {
      // Cập nhật tên khóa học
      await courseService.updateCourseName(userID, courseID, name);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },

  updateCourseAvatar: async (req, res) => {
    const { courseID } = req.params;
    const { userID } = req.body;
    const file = req.file;

    try {
      // Cập nhật avatar khóa học
      await courseService.updateCourseAvatar(userID, courseID, file);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },

  updateCourseShortcut: async (req, res) => {
    const { courseID } = req.params;
    const { userID, content } = req.body;

    try {
      // Cập nhật shortcut khóa học
      await courseService.updateCourseShortcut(userID, courseID, content);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },

  updateCourseDescription: async (req, res) => {
    const { courseID } = req.params;
    const { userID, content } = req.body;

    try {
      // Cập nhật mô tả khóa học
      await courseService.updateCourseDescription(userID, courseID, content);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },

  updateCourseCost: async (req, res) => {
    const { courseID } = req.params;
    const { userID, amount } = req.body;

    try {
      await courseService.updateCourseCost(userID, courseID, amount);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },

  confirm: async (req, res) => {
    const { courseID } = req.params;
    const { userID } = req.body;
    try {
      await courseService.updateCourseStatus(courseID, CourseStatus.CONFIRMED);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },

 /**
   * Xử lý yêu cầu cập nhật trạng thái của một khóa học.
   */
  update_state: async (req, res) => {
    const { courseID } = req.params;
    const { state } = req.query;

    try {
      if (!Object.values(CourseStatus).includes(state)) {
        return res.status(400).json({ error: "Invalid course status" });
      }

      await courseService.updateCourseStatus(courseID, state);
      res.status(200).json({ message: `Course status updated to ${state}` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Xử lý yêu cầu xoa một khóa học.
   */
  deleteCourse: async (req, res) => {
    const { courseID } = req.params;
    const { userID } = req.query;

    try {
      await courseService.deleteCourse(courseID, userID);
      res.status(200).json({ message: `Course status updated to ${state}` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = courseController;
