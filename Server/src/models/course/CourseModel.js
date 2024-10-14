const connection = require("~/config/db");

const Course = {
  /**
   * Tạo một khóa học mới.
   * @param {Array} params - Mảng chứa [UserID, CreateAt].
   * @param {Function} callback - Hàm callback xử lý kết quả trả về (error, courseID).
   */
  createCourse: (params, callback) => {
    const query = `
      INSERT INTO Course (UserID, CreateAt)
      VALUES (?, ?);
    `;

    connection.query(query, params, (err, result) => {
      if (err) {
        console.log(`Model Fail to create a course with UserID: ${err}`);
        return callback(err, null);
      }
      const insertedId = result.insertId; 
      callback(null, insertedId); 
    });
  },

  /**
   * Tìm khóa học theo tên.
   * @param {String} courseName - Tên của khóa học cần tìm.
   * @param {Function} callback - Hàm callback xử lý kết quả trả về (error, course).
   */
  findByName: (courseName, callback) => {
    const query = `SELECT * FROM Course WHERE Name = ?`;

    connection.query(query, [courseName], (err, results) => {
      if (err) {
        console.log(`Model Fail to find Course: ${err}`);
        return callback(err, null);
      }
      const course = results[0];
      callback(null, course); 
    });
  },

  /**
   * Tìm khóa học theo ID.
   * @param {Number} courseID - ID của khóa học cần tìm.
   * @param {Function} callback - Hàm callback xử lý kết quả trả về (error, course).
   */
  findById: (courseID, callback) => {
    const query = `SELECT * FROM Course WHERE CourseID = ?`;

    connection.query(query, [courseID], (err, results) => {
      if (err) {
        console.log(`Model Fail to find Course: ${err}`);
        return callback(err, null);
      }
      const course = results[0]; 
      callback(null, course); 
    });
  },

  /**
   * Cập nhật tên khóa học.
   * @param {Number} courseID - ID của khóa học cần cập nhật.
   * @param {String} name - Tên mới của khóa học.
   * @param {Function} callback - Hàm callback xử lý kết quả trả về (error, result).
   */
  updateName: (courseID, name, callback) => {
    const query = `
      UPDATE Course
      SET Name = ?
      WHERE CourseID = ?;
    `;

    connection.query(query, [name, courseID], (err, result) => {
      if (err) {
        console.log(`Fail to update course name: ${err}`);
        return callback(err, null);
      }
      callback(null, result); 
    });
  },
};

module.exports = Course;
