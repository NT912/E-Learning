const CourseModel = require("../../models/course/courseModel");
const UserModel = require("../../models/UserModel");
const message = require("../../config/message.json");

const courseService = {
  /**
   * Tạo một khóa học mới.
   * @param {Number} userID - ID của người dùng yêu cầu tạo khóa học.
   * @return {Promise<Number>} - Promise chứa ID của khóa học mới tạo hoặc lỗi.
   */
  create: async (userID) => {
    try {
      const params = [userID, new Date()];
      const courseID = await CourseModel.createCourse(params);
      return courseID;
    } catch (err) {
      console.log(`Error creating course: ${err.message}`);
      throw err; 
    }
  },

  /**
   * Cập nhật tên khóa học.
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật.
   * @param {Number} courseID - ID của khóa học cần cập nhật.
   * @param {String} name - Tên mới của khóa học.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateCourseName: async (userID, courseID, name) => {
    try {
      const course = await CourseModel.findById(courseID);
      if (!course) {
        throw new Error(message.course.updateError.description.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.course.updateError.description.noPermission);
      }

      const existingCourse = await CourseModel.findByName(name);
      if (existingCourse) {
        throw new Error(message.course.updateError.description.nameNotAvailable);
      }

      await CourseModel.updateName(courseID, name);
    } catch (err) {
      throw err; 
    }
  },
};

module.exports = courseService;
