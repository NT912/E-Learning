const LessonModel = require("../../models/course/lessonModel");
const chapterModel = require("../../models/course/chapterModel");
const courseModel = require("../../models/course/courseModel");

const firebaseHelper = require("../helpers/firebaseHelper")
const message = require('../../config/message.json');

const lessonService = {
  /**
   * Tạo một bài học mới trong chương.
   * @param {Number} userID - ID của người dùng yêu cầu tạo bài học.
   * @param {Number} chapterID - ID của chương mà bài học sẽ được thêm vào.
   * @return {Promise<Number>} - Promise chứa ID của bài học mới tạo hoặc lỗi.
   */
  createLesson: async (userID, chapterID) => {
      const course = await courseModel.findCourseByChapterID(chapterID);
      if (!course) {
        throw new Error(message.lesson.creationError.description.courseNotFound);
      }
  
      if (course.UserID !== userID) {
        throw new Error(message.lesson.creationError.description.noPermission);
      }
  
      const lessonID = await LessonModel.createLesson(chapterID);
      return lessonID;
  },

  /**
   * update .
   * @param {Number} userID - ID của người dùng yêu cầu tạo bài học.
   * @param {Number} chapterID - ID của chương mà bài học sẽ được thêm vào.
   * @return {Promise<Number>} - Promise chứa ID của bài học mới tạo hoặc lỗi.
   */
  updateLesson: async (userID, lessonID, title, description, file) => {
      if (!file) {
        throw new Error(message.lesson.updateError.description.missFile);
      }
      
      const lesson = await LessonModel.findById(lessonID);
      if (!lesson) {
        throw new Error(message.lesson.updateError.description.lessonNotFound);
      }

      const course = await courseModel.findCourseByLessonID(lessonID);
      if (!course) {
        throw new Error(message.lesson.creationError.description.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.lesson.creationError.description.noPermission);
      }

      let fileLink = lesson.FileLink;
      if (fileLink) {
          await firebaseHelper.deleteFile(fileLink);  
      }
      fileLink = await firebaseHelper.uploadVideo(file);

      await LessonModel.updateLesson(lessonID, title, description, fileLink);
  },

  /**
   * update .
   * @param {Number} userID - ID của người dùng yêu cầu tạo bài học.
   * @param {Number} chapterID - ID của chương mà bài học sẽ được thêm vào.
   * @return {Promise<Number>} - Promise chứa ID của bài học mới tạo hoặc lỗi.
   */
  updateLessonAllowDemo: async (userID, lessonID) => {
      const lesson = await LessonModel.findById(lessonID);
      if (!lesson) {
        throw new Error(message.lesson.updateError.description.lessonNotFound);
      }

      const course = await courseModel.findCourseByLessonID(lessonID);
      if (!course) {
        throw new Error(message.lesson.creationError.description.courseNotFound);
      }

      if (course.UserID !== userID) {
        throw new Error(message.lesson.creationError.description.noPermission);
      }

      const newState = !lesson.IsAllowDemo;
      await LessonModel.updateLessonAllowDemo(lessonID, newState);
  },

  deleteLesson: async (userID, lessonID) => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) {
      throw new Error(message.lesson.updateError.description.lessonNotFound);
    }
    
    const course = await courseModel.findCourseByLessonID(lessonID);
    if (!course) {
      throw new Error(message.lesson.creationError.description.courseNotFound);
    }
    
    if (course.UserID !== userID) {
      throw new Error(message.lesson.creationError.description.noPermission);
    }
  
    if (lesson.FileLink) {
      try {
        await firebaseHelper.deleteFile(lesson.FileLink);  
        console.log(`File deleted from Firebase: ${lesson.fileLink}`);
      } catch (err) {
        console.log(`Failed to delete file from Firebase: ${err.message}`);
        throw new Error(message.lesson.deleteError.description.fileDeletionFailed);
      }
    }
  
    await LessonModel.deleteLesson(lessonID);
  }
};

module.exports = lessonService;
