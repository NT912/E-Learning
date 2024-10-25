const CourseModel = require('../../models/course/courseModel');
const OutlineModel = require('../../models/course/outlineModel');
const message = require('../../config/message.json');

const outlineService = {
  /**
   * Tạo một mục tiêu học tập mới cho khóa học.
   * @param {Number} userID - ID của người dùng yêu cầu tạo mục tiêu học tập.
   * @param {Number} courseID - ID của khóa học mà mục tiêu học tập sẽ được thêm vào.
   * @return {Promise<Number>} - Promise chứa ID của mục tiêu học tập mới tạo hoặc lỗi.
   */
  createOutline: async (userID, courseID) => {
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error(message.outline.creationError.noCourseID);
    }

    if (userID !== course.UserID) {
      throw new Error(message.outline.creationError.noPermission);
    }

    const outComeID = await OutlineModel.addLearningOutcome(courseID);
    return outComeID;
  },

  /**
   * Cập nhật mục tiêu học tập.
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật.
   * @param {Number} outlineID - ID của mục tiêu học tập cần cập nhật.
   * @param {String} description - Nội dung mới của mục tiêu học tập.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateOutline: async (userID, outlineID, content) => {
    const outline = await OutlineModel.findById(outlineID);
    if (!outline) {
      throw new Error(message.outline.updateError.outlineNotFound);
    }

    const courseID = outline.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error(message.outline.updateError.courseNotFound);
    }

    if (course.UserID !== userID) {
      throw new Error(message.outline.updateError.noPermission);
    }

    await OutlineModel.updateLearningOutcome(outlineID, content);
  },

  /**
   * Xóa một mục tiêu học tập.
   * @param {Number} userID - ID của người dùng yêu cầu.
   * @param {Number} outlineID - ID của mục tiêu học tập cần xóa.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  deleteOutline: async (userID, outlineID) => {
    const outline = await OutlineModel.findById(outlineID);
    if (!outline) {
      throw new Error(message.outline.deleteError.outlineNotFound);
    }

    const courseID = outline.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error(message.outline.deleteError.courseNotFound);
    }

    if (course.UserID !== userID) {
      throw new Error(message.outline.deleteError.noPermission);
    }

    await OutlineModel.deleteLearningOutcome(outlineID);
  }
};

module.exports = outlineService;
