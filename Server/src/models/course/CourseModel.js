const connection = require("~/config/db");


const Course = {
  createCourse: (params, callback) => {
    const query = `
      INSERT INTO Course (UserID, CreateAt)
      VALUES (?, ?);
    `;

    connection.query(query, params, (err, result) => {
      if (err) {
        console.log(` Model Fail to create a course with UserID: ${err}`)
        return callback(err, null);
      }
      const insertedId = result.insertId; 
      callback(null, insertedId);
    });
  },

  findByName: (courseName, callback) => {
    const query = `SELECT * FROM Course WHERE name = ?`;

    connection.query(query, [courseName], (err, results) => {
      if (err) {
        console.log(`Model Fail to find D: ${err}`)
        return callback(err, null);
      }
      const course = results[0]; 
      callback(null, course);
    });
  },

  findById: (courseID, callback) => {
    const query = `SELECT * FROM Course WHERE CourseID = ?`;

    connection.query(query, [courseID], (err, results) => {
      if (err) {
        console.log(`Model Fail to find D: ${err}`)
        return callback(err, null);
      }
      const course = results[0]; 
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
        console.log(err);
        return callback(err, null);
      }
      callback(null, result);
    });
  },
};

module.exports = Course;
