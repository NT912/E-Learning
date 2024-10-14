const CourseModel = require('~/models/course/CourseModel');
const ChapterModel = require('~/models/course/ChapterModel');
const message = require('~/config/message.json');

const chapterService = {
  /**
   * Tạo một chapter mới cho khóa học
   * @param {Number} userID - ID của người dùng yêu cầu tạo chapter.
   * @param {Number} courseID - ID của khóa học mà chapter sẽ được thêm vào.
   * @param {String} chapterName - Tên của chapter mới.
   * @return {Promise<Number>} - Promise chứa ID của chapter mới tạo hoặc lỗi.
   */
  createChapter: (userID, courseID, chapterName) => {
    return new Promise((resolve, reject) => {
      CourseModel.findById(courseID, (err, course) => {
        if (err || !course) {
          console.log(`Error Get Course By Id: ${err ? err : "NoCourseId"}`);
          return reject(message.chapter.creationError.description.noCourseID);
        }

        if (userID !== course.UserID) {
          return reject(message.chapter.creationError.description.noPermission);
        }

        const params = [courseID, chapterName];

        ChapterModel.createChapter(params, (err, chapterID) => {
          if (err) {
            console.log(`Fail to create chapter for CourseID: ${courseID}`);
            return reject(message.chapter.creationError.description.failed);
          }
          resolve(chapterID);
        });
      });
    });
  },
};

module.exports = chapterService;
