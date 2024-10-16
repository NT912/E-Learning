const CourseModel = require("../../models/course/courseModel");
const ChapterModel = require("../../models/course/chapterModel");
const firebaseHelper = require("../../helpers/firebaseHelper");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);
const message = require("../../config/message.json");

const videoService = {
  /**
   * Upload video moi
   * @param {Number} userID - ID của người dùng yêu cầu tạo khóa học.
   * @param {Number} chapterID - Chapter cua khoa hoc
   * @param {File} chapterID - videoFile file
   * @return {Promise<Number>} - Promise chứa ID của khóa học mới tạo hoặc lỗi.
   */
  create: async (userID, chapterID, videoFile) => {
    try {
      console.log(duration);
      const chapter = await ChapterModel.findById(chapterID);
      if (!chapter) {
        throw new Error(message.video.uploadVideo.description.chapterNotFound);
      }

      const courseID = chapter.CourseID;
      const course = await CourseModel.findById(courseID);
      if (!course) {
        throw new Error(message.video.uploadVideo.description.courseNotFound);
      }
  
      if (course.UserID !== userID) {
        throw new Error(message.video.uploadVideo.description.noPermission);
      }

      const videolink = await firebaseHelper.uploadVideo(videoFile);
      const duration = await getVideoDuration(videoFile.buffer);

      
    } catch (err) {
      console.log(`Error creating course: ${err.message}`);
      throw err; 
    }
  },
};

module.exports = videoService;
