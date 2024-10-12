"use strict";

var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// services/CourseService.js

var CourseModel = require("../models/CourseModel");
var UserModel = require("../models/UserModel");
var messages = require(_path["default"].resolve(__dirname, '../config/message.json'));
exports.create = function (userID) {
  return new Promise(function (resolve, reject) {
    UserModel.findById(userID, function (err, user) {
      if (err || !user) {
        console.log("Error Get User By Id: ".concat(err));
        return reject(message.course.creationError.description.noUserID);
      }
    });
    var params = [userID, new Date()];
    CourseModel.createCourse(params, function (err, courseID) {
      if (err) {
        return reject(err);
      }
      resolve(courseID);
    });
  });
};
exports.updateCourseName = function (userID, courseID, name) {
  return new Promise(function (resolve, reject) {
    CourseModel.findById(courseID, function (err, course) {
      if (err || !course) {
        return reject(message.course.updateError.courseNotFound);
      }
      if (course.UserID !== userID) {
        return reject(message.course.updateError.userMismatch);
      }
      CourseModel.updateName(courseID, name, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  });
};