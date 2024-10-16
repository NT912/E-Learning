const connection = require("../../config/db");

const Lesson = {
  /**
   * Tạo một bài học mới trong chương.
   * @param {Array} params - Mảng chứa [ChapterID, Title, Description].
   * @return {Promise<Number>} - Promise chứa ID của bài học mới tạo.
   */
  createLesson: (params) => {
    const query = `
      INSERT INTO Lesson (ChapterID, Title, Description, IsAllowDemo, Period, OrderNumber)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, params, (err, result) => {
        if (err) {
          console.log(`Fail to create lesson: ${err}`);
          return reject(err);
        }
        const insertedId = result.insertId;
        resolve(insertedId);
      });
    });
  },

  /**
   * Tìm bài học theo ID.
   * @param {Number} lessonID - ID của bài học.
   * @return {Promise<Object>} - Promise chứa bài học hoặc lỗi.
   */
  findById: (lessonID) => {
    const query = `SELECT * FROM Lesson WHERE LessonID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [lessonID], (err, results) => {
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
   * Cập nhật tiêu đề và mô tả của bài học.
   * @param {Number} lessonID - ID của bài học.
   * @param {String} title - Tiêu đề mới của bài học.
   * @param {String} description - Mô tả mới của bài học.
   * @return {Promise<void>} - Promise không trả về giá trị.
   */
  updateLesson: (lessonID, title, description) => {
    const query = `
      UPDATE Lesson
      SET Title = ?, Description = ?
      WHERE LessonID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [title, description, lessonID], (err, result) => {
        if (err) {
          console.log(`Fail to update lesson: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Xóa bài học theo ID.
   * @param {Number} lessonID - ID của bài học cần xóa.
   * @return {Promise<void>} - Promise không trả về giá trị.
   */
  deleteLesson: (lessonID) => {
    const query = `
      DELETE FROM Lesson WHERE LessonID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [lessonID], (err, result) => {
        if (err) {
          console.log(`Fail to delete lesson: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  },
};

module.exports = Lesson;
