"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Discussion = void 0;
var _db = require("../config/db");
var Discussion = exports.Discussion = {
  create: function create(discussionData, callback) {
    var sql = "INSERT INTO Discussions (UserID, CourseID, Content, CreatedAt) VALUES (?, ?, ?, ?)";
    _db.db.query(sql, [discussionData.userID, discussionData.courseID, discussionData.content, new Date()], callback);
  },
  getAll: function getAll(courseID, callback) {
    var sql = "SELECT * FROM Discussions WHERE CourseID = ?";
    _db.db.query(sql, [courseID], callback);
  }
};