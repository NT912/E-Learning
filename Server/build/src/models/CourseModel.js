"use strict";

var sql = require("mssql");
var db = require("../config/db");
var Course = {
  createCourse: function createCourse(params, callback) {
    var query = "\n        INSERT INTO Course (UserID, CreateAt)\n        VALUES (@UserID, @CreateAt);\n        SELECT SCOPE_IDENTITY() AS CourseID;\n    ";
    var request = new sql.Request();
    request.input("UserID", sql.Int, params[0]);
    request.input("CreateAt", sql.DateTime, params[1]);
    request.query(query, function (err, result) {
      if (err) {
        return callback(err, null);
      }
      var insertedId = result.recordset[0].CourseID;
      callback(null, insertedId);
    });
  },
  findById: function findById(courseID, callback) {
    var query = "SELECT * FROM Course WHERE CourseID = @CourseID";
    var request = new sql.Request();
    request.input("CourseID", sql.Int, courseID);
    request.query(query, function (err, result) {
      if (err) return callback(err, null);
      var course = result.recordset[0];
      callback(null, course);
    });
  },
  updateName: function updateName(courseID, name, callback) {
    var query = "\n      UPDATE Course\n      SET Name = @Name\n      WHERE CourseID = @CourseID\n    ";
    var request = new sql.Request();
    request.input("Name", sql.NVarChar, name);
    request.input("CourseID", sql.Int, courseID);
    request.query(query, function (err) {
      if (err) return callback(err);
      callback(null);
    });
  }
};
module.exports = Course;