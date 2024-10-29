const LessonModel = require("../models/lessonModel");
const courseModel = require("../models/courseModel");

const firebaseHelper = require("../helpers/firebaseHelper");
const { getVideoDurationInSeconds } = require('get-video-duration')

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
      throw new Error("Course not found.");
    }

    if (course.UserID !== userID) {
      throw new Error("You do not have permission to create a lesson in this course.");
    }

    const lessonID = await LessonModel.createLesson(chapterID);
    return lessonID;
  },

  /**
   * Get detailed information of a lesson, verifying user's ownership or access rights.
   * @param {Number} userID - ID of the user making the request.
   * @param {Number} lessonID - ID of the lesson to retrieve.
   * @return {Promise<Object>} - Returns lesson details or throws an error if access is denied.
   */
  getLessonDetails: async (lessonID) => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) throw new Error("Lesson not found");
    return lesson;
  },

  /**
   * Cập nhật bài học.
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật bài học.
   * @param {Number} lessonID - ID của bài học cần cập nhật.
   * @param {String} title - Tiêu đề mới của bài học.
   * @param {String} description - Mô tả mới của bài học.
   * @param {Object} file - File mới của bài học.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateLesson: async (userID, lessonID, title, description, file) => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) throw new Error("Lesson not found.");

    const course = await courseModel.findCourseByLessonID(lessonID);
    if (!course || course.UserID != userID) {
      throw new Error("You do not have permission to update this lesson.");
    }

    let fileLink = lesson.FileLink;
    let duration = lesson.duration; // Giữ nguyên duration nếu không có file mới
    const fileType = file?.mimetype;

    if (file) {
      try {
        // Xóa file cũ nếu có trước khi tải file mới
        if (fileLink) await firebaseHelper.deleteFile(fileLink);

        // Kiểm tra và lấy thời lượng video
        if (fileType === "video/mp4") {
          duration = await getVideoDurationInSeconds(file.path);
        }

        // Upload file mới và lấy đường dẫn
        fileLink = await firebaseHelper.uploadVideo(file);
      } catch (err) {
        console.error("File upload error:", err);
        throw new Error("Error uploading new file.");
      }
    }

    // Cập nhật lesson với thông tin mới
    await LessonModel.updateLesson(lessonID, title, description, fileLink, fileType, duration);
  },


  /**
   * Cập nhật trạng thái demo cho bài học.
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật bài học.
   * @param {Number} lessonID - ID của bài học cần cập nhật.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateLessonAllowDemo: async (userID, lessonID) => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) {
      throw new Error("Lesson not found.");
    }

    const course = await courseModel.findCourseByLessonID(lessonID);
    if (!course) {
      throw new Error("Course not found.");
    }

    if (course.UserID !== userID) {
      throw new Error("You do not have permission to update this lesson.");
    }

    const newState = !lesson.IsAllowDemo;
    await LessonModel.updateLessonAllowDemo(lessonID, newState);
  },

  /**
   * Xóa một bài học.
   * @param {Number} userID - ID của người dùng yêu cầu xóa bài học.
   * @param {Number} lessonID - ID của bài học cần xóa.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  deleteLesson: async (userID, lessonID) => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) {
      throw new Error("Lesson not found.");
    }

    const course = await courseModel.findCourseByLessonID(lessonID);
    if (!course) {
      throw new Error("Course not found.");
    }

    if (course.UserID !== userID) {
      throw new Error("You do not have permission to delete this lesson.");
    }

    if (lesson.FileLink) {
      try {
        await firebaseHelper.deleteFile(lesson.FileLink);
        console.log(`File deleted from Firebase: ${lesson.FileLink}`);
      } catch (err) {
        console.log(`Failed to delete file from Firebase: ${err.message}`);
        throw new Error("Failed to delete file from Firebase.");
      }
    }

    await LessonModel.deleteLesson(lessonID);
  }
};

module.exports = lessonService;
