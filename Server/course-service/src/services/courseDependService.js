// services/courseDependService.js

const courseDependModel = require("../models/courseDependModel");
const courseModel = require("../models/courseModel"); // Model để kiểm tra quyền sở hữu khóa học.

const courseDependService = {
  /**
   * Kiểm tra xem userID có phải là chủ của khóa học không.
   * @param {Number} userID - ID của người dùng.
   * @param {Number} courseID - ID của khóa học.
   * @return {Promise<Boolean>}
   */
  checkCourseOwnership: async (userID, courseID) => {
    const course = await courseModel.findById(courseID);
    if (!course) throw new Error("Course not found.");
    return course.UserID === userID;
  },

  /**
   * Thêm phụ thuộc cho khóa học
   * @param {Number} userID - ID của người dùng
   * @param {Number} courseID - ID của khóa học
   * @param {Number} dependOnCourseID - ID của khóa học cần hoàn thành trước
   * @param {Boolean} isRequire - Điều kiện bắt buộc
   */
  addCourseDepend: async (userID, courseID, dependOnCourseID, isRequire) => {
    if (courseID == dependOnCourseID) throw new Error("Course can not depend on itself.");
    const isOwner = await courseDependService.checkCourseOwnership(userID, courseID);
    if (!isOwner) throw new Error("User do not have permission to modify dependencies of this course.");

    const course = await courseModel.findById(dependOnCourseID);
    if (!course) throw new Error("Course depend on is not exist.");

    await courseDependModel.addCourseDepend(courseID, dependOnCourseID, isRequire);
  },

  /**
   * Xóa phụ thuộc khỏi khóa học
   * @param {Number} userID - ID của người dùng
   * @param {Number} courseID - ID của khóa học
   * @param {Number} dependOnCourseID - ID của khóa học cần hoàn thành trước
   */
  removeCourseDepend: async (userID, courseID, dependOnCourseID) => {
    const isOwner = await courseDependService.checkCourseOwnership(userID, courseID);
    if (!isOwner) throw new Error("User do not have permission to modify dependencies of this course.");

    await courseDependModel.removeCourseDepend(courseID, dependOnCourseID);
  },

  /**
   * Lấy danh sách phụ thuộc của khóa học
   * @param {Number} courseID - ID của khóa học
   * @return {Promise<Array>}
   */
  getCourseDependencies: async (courseID) => {
    return await courseDependModel.getCourseDependencies(courseID);
  }
};

module.exports = courseDependService;
