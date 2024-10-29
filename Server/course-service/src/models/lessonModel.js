const connection = require("../../config/database/db");

const Lesson = {
  /**
   * Tạo một bài học mới trong chương.
   * @param {Array} ChapterID - ChapterID lesson belong to
   * @return {Promise<Number>} - Promise chứa ID của bài học mới tạo.
   */
  createLesson: (ChapterID) => {
    const query = `
      INSERT INTO Lesson (ChapterID)
      VALUES (?);
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, ChapterID, (err, result) => {
        if (err) {
          console.log(`Fail to create lesson: ${err}`);
          return reject(err);
        }
        const lessonID = result.insertId;
        resolve(lessonID);
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

  getLessonsByChapterID: async (chapterID) => {
    const query = `SELECT * FROM lesson WHERE ChapterID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [chapterID], (err, result) => {
        if (err) reject(new Error("Error retrieving lessons"));
        resolve(result);
      });
    });
  },

  getLessonsByChapterIDs: async (chapterIDs) => {
    const placeholders = chapterIDs.map(() => '?').join(',');
    const query = `SELECT * FROM lesson WHERE ChapterID IN (${placeholders})`;
    return new Promise((resolve, reject) => {
      connection.query(query, chapterIDs, (err, results) => {
        if (err) reject(new Error("Failed to fetch lessons"));
        resolve(results);
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
  updateLesson: (lessonID, title, description, fileLink, fileType, duration) => {
    const query = `
      UPDATE Lesson
      SET Title = ?, Description = ?, FileLink = ?, Type = ?, Duration = ?
      WHERE LessonID = ?;
    `;

    return new Promise((resolve, reject) => {
        connection.query(query, [title, description, fileLink, fileType, duration, lessonID,], (err, result) => {
            if (err) {
                console.log(`Failed to update lesson: ${err}`);
                return reject(err);
            }
            resolve();
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
  updateLessonAllowDemo: (lessonID, newState) => {
    const query = `
      UPDATE Lesson
      SET IsAllowDemo = ?
      WHERE LessonID = ?;
    `;

    return new Promise((resolve, reject) => {
        connection.query(query, [newState, lessonID], (err, result) => {
            if (err) {
                console.log(`Failed to update lesson: ${err}`);
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
