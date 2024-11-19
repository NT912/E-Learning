const LessonModel = require("../../models/course/lessonModel");
const ChapterModel = require("../../models/course/chapterModel");
const message = require("../../config/message.json");

const lessonService = {
  /**
   * Tạo một bài học mới trong chương.
   * @param {Number} userID - ID của người dùng yêu cầu tạo bài học.
   * @param {Number} chapterID - ID của chương mà bài học sẽ được thêm vào.
   * @param {String} title - Tên của bài học mới.
   * @param {String} description - Mô tả của bài học.
   * @param {Boolean} isAllowDemo - Bài học có phải là demo hay không.
   * @param {Number} period - Thời gian học của bài học.
   * @param {Number} orderNumber - Thứ tự của bài học trong chương.
   * @return {Promise<Number>} - Promise chứa ID của bài học mới tạo hoặc lỗi.
   */
  createLesson: async (
    userID,
    chapterID,
    title,
    description,
    isAllowDemo,
    period,
    orderNumber
  ) => {
    const chapter = await ChapterModel.findById(chapterID);
    if (!chapter) {
      throw new Error(message.lesson.creationError.description.noChapterID);
    }

    // Bài học chỉ được tạo bởi giáo viên hoặc admin của khóa học
    if (userID !== chapter.UserID) {
      throw new Error(message.lesson.creationError.description.noPermission);
    }

    const params = [
      chapterID,
      title,
      description,
      isAllowDemo,
      period,
      orderNumber,
    ];
    const lessonID = await LessonModel.createLesson(params);
    return lessonID;
  },

  updateLesson: async (userID, lessonID, title, description) => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) {
      throw new Error(message.lesson.updateError.description.lessonNotFound);
    }

    const chapterID = lesson.ChapterID;
    const chapter = await ChapterModel.findById(chapterID);
    if (!chapter) {
      throw new Error(message.lesson.updateError.description.noChapterID);
    }

    if (userID !== chapter.UserID) {
      throw new Error(message.lesson.updateError.description.noPermission);
    }

    await LessonModel.updateLesson(lessonID, title, description);
  },

  deleteLesson: async (userID, lessonID) => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) {
      throw new Error(message.lesson.deleteError.description.lessonNotFound);
    }

    const chapterID = lesson.ChapterID;
    const chapter = await ChapterModel.findById(chapterID);
    if (!chapter) {
      throw new Error(message.lesson.deleteError.description.noChapterID);
    }

    if (userID !== chapter.UserID) {
      throw new Error(message.lesson.deleteError.description.noPermission);
    }

    await LessonModel.deleteLesson(lessonID);
  },
};

module.exports = lessonService;
