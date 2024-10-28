const CourseModel = require('../../models/course/courseModel');
const ChapterModel = require('../../models/course/chapterModel');
const message = require('../../config/message.json');

const chapterService = {
  /**
   * Tạo một chapter mới cho khóa học.
   * @param {Number} userID - ID của người dùng yêu cầu tạo chapter.
   * @param {Number} courseID - ID của khóa học mà chapter sẽ được thêm vào.
   * @param {String} chapterName - Tên của chapter mới.
   * @return {Promise<Number>} - Promise chứa ID của chapter mới tạo hoặc lỗi.
   */
  createChapter: async (userID, courseID) => {
    // Tìm khóa học theo ID
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error(message.chapter.creationError.noCourseID);
    }

    if (userID !== course.UserID) {
      throw new Error(message.chapter.creationError.noPermission);
    }

    const chapterID = await ChapterModel.createChapter(courseID);
    return chapterID;
  },

  /**
   * Cập nhật tên chapter.
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật.
   * @param {Number} courseID - ID của chapter cần cập nhật.
   * @param {String} name - Tên mới của chapter.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateChapterName: async (userID, chapterID, name) => {
      const chapter = await ChapterModel.findById(chapterID);
      if (!chapter) {
        throw new Error(message.chapter.updateError.chapterNotFound);
      }
      const courseID = chapter.CourseID;
      const course = await CourseModel.findCourseByChapterID(courseID);
      if (!course) {
        throw new Error(message.course.updateError.courseNotFound);
      }

  
      if (course.UserID !== userID) {
        throw new Error(message.chapter.updateError.noPermission);
      }
  
      await ChapterModel.updateTitle(chapterID, name);
  },

  /**
   * Xoá một chapter.
   * @param {Number} userID - ID của người dùng yêu cầu.
   * @param {Number} chapterID - ID của chapter cần cập nhật.
   * @param {String} name - Tên mới của khóa học.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  deleteChapter: async (userID, chapterID) => {
      const chapter = await ChapterModel.findById(chapterID);
      if (!chapter) {
        throw new Error(message.chapter.deleteError.chapterNotFound);
      }

      const courseID = chapter.CourseID;
      const course = await CourseModel.findById(courseID);
      if (!course) {
        throw new Error(message.chapter.deleteError.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.chapter.deleteError.noPermission);
      }

      await ChapterModel.deleteChapter(chapterID);
  }
};

module.exports = chapterService;
