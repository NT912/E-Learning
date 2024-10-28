const CourseModel = require('../models/courseModel');
const ChapterModel = require('../models/chapterModel');

const chapterService = {
  /**
   * Tạo một chapter mới cho khóa học.
   * @param {Number} userID - ID của người dùng yêu cầu tạo chapter.
   * @param {Number} courseID - ID của khóa học mà chapter sẽ được thêm vào.
   * @return {Promise<Number>} - Promise chứa ID của chapter mới tạo hoặc lỗi.
   */
  createChapter: async (userID, courseID) => {
    // Tìm khóa học theo ID
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error("Course not found.");
    }

    if (userID !== course.UserID) {
      throw new Error("You do not have permission to create a chapter in this course.");
    }

    const chapterID = await ChapterModel.createChapter(courseID);
    return chapterID;
  },

  /**
   * Cập nhật tên chapter.
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật.
   * @param {Number} chapterID - ID của chapter cần cập nhật.
   * @param {String} name - Tên mới của chapter.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateChapterName: async (userID, chapterID, name) => {
    const chapter = await ChapterModel.findById(chapterID);
    if (!chapter) {
      throw new Error("Chapter not found.");
    }
    
    const courseID = chapter.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error("Course not found.");
    }

    if (course.UserID !== userID) {
      throw new Error("You do not have permission to update this chapter.");
    }

    await ChapterModel.updateTitle(chapterID, name);
  },

  /**
   * Xoá một chapter.
   * @param {Number} userID - ID của người dùng yêu cầu.
   * @param {Number} chapterID - ID của chapter cần xóa.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  deleteChapter: async (userID, chapterID) => {
    const chapter = await ChapterModel.findById(chapterID);
    if (!chapter) {
      throw new Error("Chapter not found.");
    }

    const courseID = chapter.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error("Course not found.");
    }

    if (course.UserID !== userID) {
      throw new Error("You do not have permission to delete this chapter.");
    }

    await ChapterModel.deleteChapter(chapterID);
  }
};

module.exports = chapterService;
