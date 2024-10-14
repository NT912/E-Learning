const CourseModel = require('~/models/course/CourseModel');
const ChapterModel = require('~/models/course/ChapterModel');
const message = require('~/config/message.json');

const chapterService = {
  createChapter: (userID, courseID, chapterName, userID) => {
    return new Promise((resolve, reject) => {
      CourseModel.findById(courseID, (err, course) => {
        if (err || !course) {
          console.log(`Error Get Course By Id: ${err ? err : "NoCourseId"}`);
          return reject(message.chapter.creationError.description.noCourseID);
        }

        
        if (userID !== course.CourseID) {
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
