const connection = require("../../config/db");

const outlineModel = {
  /**
   * Thêm mục tiêu học tập vào khóa học.
   * @param {Number} courseID - ID của khóa học.
   * @param {String} description - Nội dung của mục tiêu học tập.
   * @return {Promise<void>}
   */
  addLearningOutcome: (courseID, description) => {
    const query = `
      INSERT INTO CourseOutcomes (CourseID, Description)
      VALUES (?, ?);
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [courseID, description], (err, result) => {
        if (err) {
          console.error(`Failed to add learning outcome: ${err.message}`);
          return reject(err);
        }
        resolve();
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
      UPDATE CourseOutcomes
      SET Description = ?
      WHERE OutcomeID = ?;
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
      DELETE FROM CourseOutcomes
      WHERE OutcomeID = ?;
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
