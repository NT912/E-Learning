const CourseModel = require("../../models/course/courseModel");
const UserModel = require("../../models/UserModel");
const message = require('../../config/message.json');

const firebaseHelper = require("../helpers/firebaseHelper")

const courseService = {
  /**
   * Tạo một khóa học mới.
   * @param {Number} userID - ID của người dùng yêu cầu tạo khóa học.
   * @return {Promise<Number>} - Promise chứa ID của khóa học mới tạo hoặc lỗi.
   */
  create: async (userID) => {
    try {
      const courseID = await CourseModel.createCourse(userID, new Date());
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
        throw new Error(message.course.updateError.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.course.updateError.noPermission);
      }

      const existingCourse = await CourseModel.findByName(name);
      if (existingCourse) {
        if (existingCourse.CourseID == courseID) return; 
        throw new Error(message.course.updateError.nameNotAvailable);
      }

      await CourseModel.updateName(courseID, name);
    } catch (err) {
      throw err; 
    }
  },

  /**
   * Update state of course.
   * @param {Number} userID - ID của người dùng yêu cầu tạo khóa học.
   * @return {Promise<Number>} - Promise chứa ID của khóa học mới tạo hoặc lỗi.
   */
  updateCourseStatus: async (userID, courseID, newStatus) => {
    try {
      const course = await CourseModel.findById(courseID);
      if (!course) {
        throw new Error(message.course.updateError.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.course.updateError.noPermission);
      }

      CourseModel.updateStatus(courseID, newStatus);
    } catch (err) {
      console.log(`Error creating course: ${err.message}`);
      throw err; 
    }
  },

  updateCourseAvatar: async (userID, courseID, file) => {
    try {
      if (!file) {
        throw new Error(message.lesson.updateError.missFile);
      }

      const course = await CourseModel.findById(courseID);
      if (!course) {
        throw new Error(message.course.updateError.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.course.updateError.noPermission);
      }

      let fileLink = course.PictureLink;
      if (fileLink) {
          await firebaseHelper.deleteFile(fileLink);  
      }
      fileLink = await firebaseHelper.uploadAvatarCourse(file);

      CourseModel.updateAvatar(courseID, fileLink);
    } catch (err) {
      console.log(`Error update avatar course: ${err.message}`);
      throw err; 
    }
  },

  updateCourseShortcut: async (userID, courseID, content) => {
    try {
      const course = await CourseModel.findById(courseID);
      if (!course) {
        throw new Error(message.course.updateError.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.course.updateError.noPermission);
      }

      CourseModel.updateShortcut(courseID, content);
    } catch (err) {
      console.log(`Error update avatar course: ${err.message}`);
      throw err; 
    }
  },

  updateCourseDescription: async (userID, courseID, content) => {
    try {
      const course = await CourseModel.findById(courseID);
      if (!course) {
        throw new Error(message.course.updateError.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.course.updateError.noPermission);
      }

      CourseModel.updateDescription(courseID, content);
    } catch (err) {
      console.log(`Error update avatar course: ${err.message}`);
      throw err; 
    }
  },

  updateCourseCost: async (userID, courseID, amount) => {
    try {
      const course = await CourseModel.findById(courseID);
      if (!course) {
        throw new Error(message.course.updateError.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.course.updateError.noPermission);
      }

      CourseModel.updateCost(courseID, amount);
    } catch (err) {
      console.log(`Error update avatar course: ${err.message}`);
      throw err; 
    }
  },
};

module.exports = courseService;
