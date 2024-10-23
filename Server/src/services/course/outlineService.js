const CourseModel = require('../../models/course/courseModel');
const OutlineModel = require('../../models/course/outlineModel');
const message = require('../../config/message.json');

const outlineService = {
  /**
   * Tạo một mục tiêu học tập mới cho khóa học.
   * @param {Number} userID - ID của người dùng yêu cầu tạo mục tiêu học tập.
   * @param {Number} courseID - ID của khóa học mà mục tiêu học tập sẽ được thêm vào.
   * @param {String} description - Nội dung của mục tiêu học tập.
   * @return {Promise<Number>} - Promise chứa ID của mục tiêu học tập mới tạo hoặc lỗi.
   */
  createOutline: async (userID, courseID, description) => {
    // Tìm khóa học theo ID
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error(message.outline.creationError.description.noCourseID);
    }

    if (userID !== course.UserID) {
      throw new Error(message.outline.creationError.description.noPermission);
    }

    const params = [courseID, description];
    const outlineID = await OutlineModel.addLearningOutcome(params);
    return outlineID;
  },

  /**
   * Cập nhật mục tiêu học tập.
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật.
   * @param {Number} outlineID - ID của mục tiêu học tập cần cập nhật.
   * @param {String} description - Nội dung mới của mục tiêu học tập.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateOutline: async (userID, outlineID, description) => {
    const outline = await OutlineModel.findById(outlineID);
    if (!outline) {
      throw new Error(message.outline.updateError.description.outlineNotFound);
    }

    const courseID = outline.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error(message.course.updateError.description.courseNotFound);
    }

    if (course.UserID !== userID) {
      throw new Error(message.outline.updateError.description.noPermission);
    }

    await OutlineModel.updateLearningOutcome(outlineID, description);
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
      throw new Error(message.outline.deleteError.description.outlineNotFound);
    }

    const courseID = outline.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error(message.course.deleteError.description.courseNotFound);
    }

    if (course.UserID !== userID) {
      throw new Error(message.outline.deleteError.description.noPermission);
    }

    await OutlineModel.deleteLearningOutcome(outlineID);
  }
};

module.exports = outlineService;
