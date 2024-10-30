// models/course/courseDependModel.js

const db = require("../../config/database/db");

const courseDependModel = {
  /**
   * Thêm một phụ thuộc khóa học
   * @param {Number} courseID - ID của khóa học cần yêu cầu khóa học khác
   * @param {Number} dependOnCourseID - ID của khóa học cần hoàn thành trước
   * @param {Boolean} isRequire - Điều kiện bắt buộc
   */
  addCourseDepend: async (courseID, dependOnCourseID, isRequire) => {
    const query = `
      INSERT INTO coursedepend (CourseID, DependOnCourseID, IsRequire)
      VALUES (?, ?, ?)
    `;
    await db.execute(query, [courseID, dependOnCourseID, isRequire]);
  },

  /**
   * Xóa một phụ thuộc khóa học
   * @param {Number} courseID - ID của khóa học
   * @param {Number} dependOnCourseID - ID của khóa học cần hoàn thành trước
   */
  removeCourseDepend: async (courseID, dependOnCourseID) => {
    const query = `
      DELETE FROM coursedepend
      WHERE CourseID = ? AND DependOnCourseID = ?
    `;
    await db.execute(query, [courseID, dependOnCourseID]);
  },

  /**
   * Lấy danh sách phụ thuộc của một khóa học
   * @param {Number} courseID - ID của khóa học
   * @return {Promise<Array>}
   */
  getCourseDependencies: async (courseID) => {
    const query = `
      SELECT cd.DependOnCourseID, cd.IsRequire, c.Name AS DependCourseName
      FROM coursedepend AS cd
      JOIN course AS c ON cd.DependOnCourseID = c.CourseID
      WHERE cd.CourseID = ?
    `;
    const [results] = await db.execute(query, [courseID]);
    return results;
  }
};

module.exports = courseDependModel;
