// controllers/courseDependController.js

const courseDependService = require("../services/courseDependService");

const courseDependController = {
  /**
   * Thêm phụ thuộc cho khóa học
   */
  addCourseDepend: async (req, res) => {
    const { courseID } = req.params;
    const { dependOnCourseID, isRequire, userID } = req.body;

    try {
      await courseDependService.addCourseDepend(userID, courseID, dependOnCourseID, isRequire);
      res.status(201).json({ message: "Dependency added to course successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Xóa phụ thuộc khỏi khóa học
   */
  removeCourseDepend: async (req, res) => {
    const { courseID, dependOnCourseID } = req.params;
    const { userID } = req.body;

    try {
      await courseDependService.removeCourseDepend(userID, courseID, dependOnCourseID);
      res.status(200).json({ message: "Dependency removed from course successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Lấy danh sách phụ thuộc của một khóa học
   */
  getCourseDependencies: async (req, res) => {
    const { courseID } = req.params;

    try {
      const dependencies = await courseDependService.getCourseDependencies(courseID);
      res.status(200).json(dependencies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = courseDependController;
