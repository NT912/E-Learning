// services/CourseService.js
const path = require("path");
const CourseModel = require("../models/CourseModel");
const UserModel = require("../models/UserModel");
const messages = require(path.resolve(__dirname, '../config/message.json'));

exports.create = (userID) => {
  return new Promise((resolve, reject) => {
    UserModel.findById(userID, (err, user) => {
      if (err || !user) {
        console.log(`Error Get User By Id: ${err}`);
        return reject(message.course.creationError.description.noUserID);
      }
    });

    const params = [userID, new Date()];

    CourseModel.createCourse(params, (err, courseID) => {
      if (err) {
        return reject(err);
      }
      resolve(courseID);
    });
  });
};

exports.updateCourseName = (userID, courseID, name) => {
  return new Promise((resolve, reject) => {
    CourseModel.findById(courseID, (err, course) => {
      if (err || !course) {
        return reject(message.course.updateError.courseNotFound);
      }

      if (course.UserID !== userID) {
        return reject(message.course.updateError.userMismatch);
      }

      CourseModel.updateName(courseID, name, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
};
