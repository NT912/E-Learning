const categoryOfCourseService = require("../../services/course/categoryOfCourseService");

const categoryOfCourseController = {
  /**
   * Thêm danh mục vào khóa học.
   */
  addCategoriesToCourse: async (req, res) => {
    const { courseID } = req.params;
    const { categoryIDs } = req.body; // Mảng chứa các categoryID
    
    try {
      await categoryOfCourseService.addCategoriesToCourse(courseID, categoryIDs);
      res.status(201).json({ message: "Categories added to course successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Xóa danh mục khỏi khóa học.
   */
  removeCategoryFromCourse: async (req, res) => {
    const { courseID, categoryID } = req.params;
    
    try {
      await categoryOfCourseService.removeCategoryFromCourse(courseID, categoryID);
      res.status(200).json({ message: "Category removed from course successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Lấy tất cả danh mục của một khóa học.
   */
  getCategoriesOfCourse: async (req, res) => {
    const { courseID } = req.params;
    
    try {
      const categories = await categoryOfCourseService.getCategoriesOfCourse(courseID);
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = categoryOfCourseController;
