const CourseModel = require('~/models/course/CourseModel');
const ChapterModel = require('~/models/course/ChapterModel');
const message = require('~/config/message.json');

const chapterService = {
  /**
   * Tạo một chapter mới cho khóa học.
   * @param {Number} userID - ID của người dùng yêu cầu tạo chapter.
   * @param {Number} courseID - ID của khóa học mà chapter sẽ được thêm vào.
   * @param {String} chapterName - Tên của chapter mới.
   * @return {Promise<Number>} - Promise chứa ID của chapter mới tạo hoặc lỗi.
   */
  createChapter: async (userID, courseID, chapterName) => {
    // Tìm khóa học theo ID
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error(message.chapter.creationError.description.noCourseID);
    }

    if (userID !== course.UserID) {
      throw new Error(message.chapter.creationError.description.noPermission);
    }

    const params = [courseID, chapterName];
    const chapterID = await ChapterModel.createChapter(params);
    return chapterID;
  },

  /**
   * Cập nhật tên khóa học.
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật.
   * @param {Number} courseID - ID của khóa học cần cập nhật.
   * @param {String} name - Tên mới của khóa học.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateChapterName: async (userID, chapterID, name) => {
    try {
      const chapter = await ChapterModel.findById(chapterID);
      if (!chapter) {
        throw new Error(message.chapter.updateError.description.chapterNotFound);
      }
      const courseID = chapter.CourseID;
      const course = await CourseModel.findById(courseID);
      if (!course) {
        throw new Error(message.course.updateError.description.courseNotFound);
      }
  
      if (course.UserID !== userID) {
        throw new Error(message.chapter.updateError.description.noPermission);
      }
  
      await ChapterModel.updateTitle(chapterID, name);
    } catch (err) {
      throw err; 
    }
  }
  
};

module.exports = chapterService;
