// services/CourseService.js
const CourseModel = require('~/models/course/CourseModel');
const UserModel = require('~/models/UserModel');
const message = require('~/config/message.json');

const courseService = {
  create: (userID) => {
    return new Promise((resolve, reject) => {
      UserModel.findById(userID, (err, user) => {
        if (err || !user) {
          console.log(`Error Get User By Id: ${err ? err : "NoIdUser"}`);
          return reject(message.course.creationError.description.noUserID);
        }

        if (user.Role === 'student') {
          return reject(message.course.creationError.description.noPermission);
        }
      });

      const params = [userID, new Date()];
        
      CourseModel.createCourse(params, (err, courseID) => {
        if (err) {
          console.log(`Fail to create course with UserID: ${userID}`);
          return reject(message.course.creationError.description.failed);
        }
        resolve(courseID);
      });
    });
  },
  
  updateCourseName: (userID, courseID, name) => {
    return new Promise((resolve, reject) => {
      CourseModel.findById(courseID, (err, course) => {
        if (err || !course) {
          return reject(message.course.updateError.description.courseNotFound);
        }

        if (course.UserID !== userID) {
          return reject(message.course.updateError.description.noPermission);
        }
      });

      CourseModel.findByName(name, (err, course) => {
        if (err || course) {
          return reject(message.course.updateError.description.nameNotAvailable);
        }
      });

      CourseModel.updateName(courseID, name, (err) => {
        if (err) {
          return reject(message.course.updateError.description.serverfail);
        }
        resolve();
      });
    });
  }
}

module.exports = courseService;
  
