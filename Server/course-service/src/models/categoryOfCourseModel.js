const connection = require("../../config/database/db");

const categoryOfCourseModel = {
  /**
   * Thêm một liên kết giữa khóa học và danh mục.
   * @param {Number} courseID - ID của khóa học.
   * @param {Number} categoryID - ID của danh mục.
   * @return {Promise<Number>} - ID của liên kết vừa được tạo.
   */
  addCategoryToCourse: (courseID, categoryID) => {
    const query = `INSERT INTO categoryofcourse (CourseID, CategoryID) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      connection.query(query, [courseID, categoryID], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId); // Trả về ID của liên kết vừa tạo
      });
    });
  },

  /**
   * Xóa liên kết giữa khóa học và danh mục.
   * @param {Number} courseID - ID của khóa học.
   * @param {Number} categoryID - ID của danh mục.
   * @return {Promise<void>}
   */
  removeCategoryFromCourse: (courseID, categoryID) => {
    const query = `DELETE FROM categoryofcourse WHERE CourseID = ? AND CategoryID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [courseID, categoryID], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Lấy tất cả các danh mục thuộc về một khóa học.
   * @param {Number} courseID - ID của khóa học.
   * @return {Promise<Array>} - Danh sách tất cả các danh mục của khóa học.
   */
  getCategoriesOfCourse: (courseID) => {
    const query = `SELECT * FROM categoryofcourse WHERE CourseID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [courseID], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
};

module.exports = categoryOfCourseModel;
