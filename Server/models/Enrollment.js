const db = require("../config/db");

const Enrollment = {
  create: (enrollmentData, callback) => {
    const sql = `INSERT INTO Enrollment (UserID, CourseID, CreateAt) VALUES (?, ?, ?)`;
    db.query(
      sql,
      [enrollmentData.userID, enrollmentData.courseID, new Date()],
      callback
    );
  },

  getByUserID: (userID, callback) => {
    const sql = `SELECT * FROM Enrollment WHERE UserID = ?`;
    db.query(sql, [userID], callback);
  },

  getByCourseID: (courseID, callback) => {
    const sql = `SELECT * FROM Enrollment WHERE CourseID = ?`;
    db.query(sql, [courseID], callback);
  },

  checkEnrollment: (userID, courseID, callback) => {
    const sql = `SELECT * FROM Enrollment WHERE UserID = ? AND CourseID = ?`;
    db.query(sql, [userID, courseID], callback);
  },

  deleteEnrollment: (enrollmentID, callback) => {
    const sql = `DELETE FROM Enrollment WHERE EnrollmentID = ?`;
    db.query(sql, [enrollmentID], callback);
  },
};

module.exports = Enrollment;
