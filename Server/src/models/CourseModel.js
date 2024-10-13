const { connection } = require("../config/db");

const Course = {
  createCourse: (params, callback) => {
    const query = `
      INSERT INTO Course (UserID, CreateAt)
      VALUES (?, ?);
    `;

    connection.query(query, params, (err, result) => {
      if (err) {
        console.log(`Fail to create a course with UserID: ${err}`)
        return callback(err, null);
      }
      const insertedId = result.insertId; 
      callback(null, insertedId);
    });
  },

  findById: (courseID, callback) => {
    const query = `SELECT * FROM Course WHERE CourseID = ?`;

    connection.query(query, [courseID], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      const course = results[0]; // Get the first record
      callback(null, course);
    });
  },

  updateName: (courseID, name, callback) => {
    const query = `
      UPDATE Course
      SET Name = ?
      WHERE CourseID = ?
    `;

    connection.query(query, [name, courseID], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  },
};

module.exports = Course;
