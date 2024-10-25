const connection = require("../../config/db");

const Chapter = {
  /**
   * Tạo một chapter mới cho khóa học.
   * @param {Array} params - Mảng chứa [CourseID, Title].
   * @return {Promise<Number>} - Promise chứa ID của chapter mới tạo.
   */
  createChapter: (courseID) => {
    const query = `
      INSERT INTO Chapter (CourseID)
      VALUES (?);
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, courseID, (err, result) => {
        if (err) {
          console.log(`Fail to create chapter with CourseID: ${err}`);
          return reject(err);
        }
        const insertedId = result.insertId;
        resolve(insertedId); 
      });
    });
  },

  /**
   * Tìm chapter theo ID.
   * @param {Number} chapterID - ID của chapter.
   * @return {Promise<Object>} - Promise chứa chapter hoặc lỗi.
   */
  findById: (chapterID) => {
    const query = `SELECT * FROM Chapter WHERE ChapterID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [chapterID], (err, results) => {
        if (err) {
          console.log(`Fail to find chapter by ID: ${err}`);
          return reject(err);
        }
        const chapter = results[0] || null; 
        resolve(chapter);
      });
    });
  },

  /**
   * Cập nhật tiêu đề của chapter.
   * @param {Number} chapterID - ID của chapter.
   * @param {String} title - Tiêu đề mới của chapter.
   * @return {Promise<void>} - Promise không trả về giá trị.
   */
  updateTitle: (chapterID, title) => {
    const query = `
      UPDATE Chapter
      SET Title = ?
      WHERE ChapterID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [title, chapterID], (err, result) => {
        if (err) {
          console.log(`Fail to update chapter title: ${err}`);
          return reject(err);
        }
        resolve(); 
      });
    });
  },

  /**
   * Xóa chapter theo ID.
   * @param {Number} chapterID - ID của chapter cần xóa.
   * @return {Promise<void>} - Promise không trả về giá trị.
   */
  deleteChapter: (chapterID) => {
    const query = `
      DELETE FROM Chapter WHERE ChapterID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [chapterID], (err, result) => {
        if (err) {
          console.log(`Fail to delete chapter: ${err}`);
          return reject(err);
        }
        resolve(); 
      });
    });
  }
};

module.exports = Chapter;
