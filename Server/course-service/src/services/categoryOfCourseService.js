const categoryOfCourseModel = require("../../models/course/categoryOfCourseModel");

const categoryOfCourseService = {
  /**
   * Thêm danh mục vào một khóa học.
   * @param {Number} courseID - ID của khóa học.
   * @param {Array} categoryIDs - Mảng chứa các ID của danh mục.
   * @return {Promise<void>}
   */
  addCategoriesToCourse: async (courseID, categoryIDs) => {
    try {
      for (const categoryID of categoryIDs) {
        await categoryOfCourseModel.addCategoryToCourse(courseID, categoryID);
      }
    } catch (err) {
      throw new Error(`Failed to add categories to course: ${err.message}`);
    }
  },

  /**
   * Xóa danh mục khỏi một khóa học.
   * @param {Number} courseID - ID của khóa học.
   * @param {Number} categoryID - ID của danh mục.
   * @return {Promise<void>}
   */
  removeCategoryFromCourse: async (courseID, categoryID) => {
    try {
      await categoryOfCourseModel.removeCategoryFromCourse(courseID, categoryID);
    } catch (err) {
      throw new Error(`Failed to remove category from course: ${err.message}`);
    }
  },

  /**
   * Lấy tất cả danh mục của một khóa học.
   * @param {Number} courseID - ID của khóa học.
   * @return {Promise<Array>}
   */
  getCategoriesOfCourse: async (courseID) => {
    try {
      const categories = await categoryOfCourseModel.getCategoriesOfCourse(courseID);
      return categories;
    } catch (err) {
      throw new Error(`Failed to get categories of course: ${err.message}`);
    }
  }
};

module.exports = categoryOfCourseService;
