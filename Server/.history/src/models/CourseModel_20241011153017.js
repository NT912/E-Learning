const sql = require("mssql");
const db = require("../config/db");

const Course = {
  createCourse: (params, callback) => {
    const query = `
        INSERT INTO Course (UserID, CreateAt)
        VALUES (@UserID, @CreateAt);
        SELECT SCOPE_IDENTITY() AS CourseID;
    `;

    const request = new sql.Request();
    request.input("UserID", sql.Int, params[0]);
    request.input("CreateAt", sql.DateTime, params[1]);

    request.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const insertedId = result.recordset[0].CourseID;
      callback(null, insertedId);
    });
  },

  findById: (courseID, callback) => {
    const query = `SELECT * FROM Course WHERE CourseID = @CourseID`;

    const request = new sql.Request();
    request.input("CourseID", sql.Int, courseID);

    request.query(query, (err, result) => {
      if (err) return callback(err, null);
      const course = result.recordset[0];
      callback(null, course);
    });
  },

  updateName: (courseID, name, callback) => {
    const query = `
      UPDATE Course
      SET Name = @Name
      WHERE CourseID = @CourseID
    `;

    const request = new sql.Request();
    request.input("Name", sql.NVarChar, name);
    request.input("CourseID", sql.Int, courseID);

    request.query(query, (err) => {
      if (err) return callback(err);
      callback(null);
    });
  },
};

module.exports = Course;
