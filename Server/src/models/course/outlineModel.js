const connection = require("../../../config/database/db");

const outlineModel = {
  /**
   * Tìm bài học theo ID.
   * @param {Number} lessonID - ID của bài học.
   * @return {Promise<Object>} - Promise chứa bài học hoặc lỗi.
   */
  findById: (courseOutcomeID) => {
    const query = `SELECT * FROM courseoutcome WHERE CourseOutcomeID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [courseOutcomeID], (err, results) => {
        if (err) {
          console.log(`Fail to find lesson by ID: ${err}`);
          return reject(err);
        }
        const lesson = results[0] || null;
        resolve(lesson);
      });
    });
  },

  /**
   * Thêm mục tiêu học tập vào khóa học.
   * @param {Number} courseID - ID của khóa học.
   * @return {Promise<void>}
   */
  addLearningOutcome: (courseID) => {
    const query = `
      INSERT INTO courseoutcome (CourseID)
      VALUES (?);
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [courseID], (err, result) => {
        if (err) {
          console.error(`Failed to add learning outcome: ${err.message}`);
          return reject(err);
        }
        const outcomeID = result.insertId;
        resolve(outcomeID); 
      });
    });
  },

  /**
   * Cập nhật mục tiêu học tập.
   * @param {Number} outcomeID - ID của mục tiêu học tập.
   * @param {String} description - Nội dung mới của mục tiêu học tập.
   * @return {Promise<void>}
   */
  updateLearningOutcome: (outcomeID, description) => {
    const query = `
      UPDATE CourseOutcome
      SET Content = ?
      WHERE CourseOutcomeID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [description, outcomeID], (err, result) => {
        if (err) {
          console.error(`Failed to update learning outcome: ${err.message}`);
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Xóa mục tiêu học tập.
   * @param {Number} outcomeID - ID của mục tiêu học tập cần xóa.
   * @return {Promise<void>}
   */
  deleteLearningOutcome: (outcomeID) => {
    const query = `
      DELETE FROM CourseOutcome
      WHERE CourseOutcomeID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [outcomeID], (err, result) => {
        if (err) {
          console.error(`Failed to delete learning outcome: ${err.message}`);
          return reject(err);
        }
        resolve();
      });
    });
  }
};

module.exports = outlineModel;
