const connection = require("../../config/db");

const Course = {
  /**
   * Tạo một khóa học mới.
   * @param {Array} params - Mảng chứa [UserID, CreateAt].
   * @return {Promise<Number>} - Promise chứa ID của khóa học mới tạo.
   */
  createCourse: (userID, createAt) => {
    const query = `
      INSERT INTO Course (UserID, CreateAt)
      VALUES (?, ?);
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [userID, createAt], (err, result) => {
        if (err) {
          console.log(`Model Fail to create a course with UserID: ${err}`);
          return reject(err);
        }
        const courseID = result.insertId;
        resolve(courseID);
      });
    });
  },

  /**
   * Tìm khóa học theo tên.
   * @param {String} courseName - Tên của khóa học cần tìm.
   * @return {Promise<Object|null>} - Promise chứa khóa học tìm được hoặc null nếu không tìm thấy.
   */
  findByName: (courseName) => {
    const query = `SELECT * FROM Course WHERE Name = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [courseName], (err, results) => {
        if (err) {
          console.log(`Model Fail to find Course: ${err}`);
          return reject(err);
        }
        const course = results[0] || null; 
        resolve(course);
      });
    });
  },

  /**
   * Tìm khóa học theo ID.
   * @param {Number} courseID - ID của khóa học cần tìm.
   * @return {Promise<Object|null>} - Promise chứa khóa học tìm được hoặc null nếu không tìm thấy.
   */
  findById: (courseID) => {
    const query = `SELECT * FROM course WHERE CourseID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, courseID, (err, results) => {
        if (err) {
          console.log(`Model Fail to find Course: ${err}`);
          return reject(err);
        }
        const course = results[0] || null; 
        resolve(course);
      });
    });
  },
//
  /**
   * Cập nhật tên khóa học.
   * @param {Number} courseID - ID của khóa học cần cập nhật.
   * @param {String} name - Tên mới của khóa học.
   * @return {Promise<void>} - Promise không trả về giá trị.
   */
  updateName: (courseID, name) => {
    const query = `
      UPDATE Course
      SET Name = ?
      WHERE CourseID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [name, courseID], (err, result) => {
        if (err) {
          console.log(`Fail to update course name: ${err}`);
          return reject(err);
        }
        resolve(); 
      });
    });
  },
};

module.exports = Course;
