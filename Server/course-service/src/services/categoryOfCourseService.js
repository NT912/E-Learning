const categoryOfCourseModel = require("../../models/course/categoryOfCourseModel");
const courseModel = require("../../models/course/courseModel"); // Model để kiểm tra quyền sở hữu khóa học.

const categoryOfCourseService = {
  /**
   * Kiểm tra xem userID có phải là chủ của khóa học không.
   * @param {Number} userID - ID của người dùng.
   * @param {Number} courseID - ID của khóa học.
   * @return {Promise<Boolean>}
   */
  checkCourseOwnership: async (userID, courseID) => {
    const course = await courseModel.getCourseByID(courseID);
    if (!course) throw new Error("Course not found.");
    return course.UserID === userID;
  },

    /**
   * Thêm danh mục vào một khóa học.
   * @param {Number} userID - ID của người dùng.
   * @param {Number} courseID - ID của khóa học.
   * @param {Array} categoryIDs - Mảng chứa các ID của danh mục.
   * @return {Promise<void>}
   */
  addCategoriesToCourse: async (userID, courseID, categoryIDs) => {
    try {
      const isOwner = await categoryOfCourseService.checkCourseOwnership(userID, courseID);
      if (!isOwner) throw new Error("User does not have permission for this course.");
  
      await Promise.all(
        categoryIDs.map((categoryID) => 
          categoryOfCourseModel.addCategoryToCourse(courseID, categoryID)
        )
      );
    } catch (err) {
      throw new Error(`Failed to add categories to course: ${err.message}`);
    }
  },


  /**
   * Xóa danh mục khỏi một khóa học.
   * @param {Number} userID - ID của người dùng.
   * @param {Number} courseID - ID của khóa học.
   * @param {Number} categoryID - ID của danh mục.
   * @return {Promise<void>}
   */
  removeCategoryFromCourse: async (userID, courseID, categoryID) => {
    try {
      const isOwner = await categoryOfCourseService.checkCourseOwnership(userID, courseID);
      if (!isOwner) throw new Error("User do not have permission of the course.");

      await categoryOfCourseModel.removeCategoryFromCourse(courseID, categoryID);
    } catch (err) {
      throw new Error(`Failed to remove category from course: ${err.message}`);
    }
  },

  /**
   * Lấy tất cả danh mục của một khóa học.
   * @param {Number} userID - ID của người dùng.
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
