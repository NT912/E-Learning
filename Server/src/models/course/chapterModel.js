const connection = require("~/config/db");

const Chapter = {
  /**
   * Tạo một chapter mới cho khóa học
   * @param {Array} params - Mảng chứa [CourseID, Title, CreateAt].
   * @param {Function} callback - Hàm callback xử lý kết quả trả về (error, chapterID).
   */
  createChapter: (params, callback) => {
    const query = `
      INSERT INTO Chapter (CourseID, Title)
      VALUES (?, ?);
    `;

    connection.query(query, params, (err, result) => {
      if (err) {
        console.log(`Fail to create chapter with CourseID: ${err}`);
        return callback(err, null);
      }
      const insertedId = result.insertId;
      callback(null, insertedId);
    });
  },

  /**
   * Tìm chapter theo ID
   * @param {Number} chapterID - ID của chapter
   * @param {Function} callback - Hàm callback xử lý kết quả trả về (error, chapter).
   */
  findById: (chapterID, callback) => {
    const query = `SELECT * FROM Chapter WHERE ChapterID = ?`;

    connection.query(query, [chapterID], (err, results) => {
      if (err) {
        console.log(`Fail to find chapter by ID: ${err}`);
        return callback(err, null);
      }
      const chapter = results[0];
      callback(null, chapter);
    });
  },

  /**
   * Cập nhật tên của chapter
   * @param {Number} chapterID - ID của chapter.
   * @param {String} title - Tên mới của chapter.
   * @param {Function} callback - Hàm callback xử lý kết quả trả về (error, result).
   */
  updateTitle: (chapterID, title, callback) => {
    const query = `
      UPDATE Chapter
      SET Title = ?
      WHERE ChapterID = ?
    `;

    connection.query(query, [title, chapterID], (err, result) => {
      if (err) {
        console.log(`Fail to update chapter title: ${err}`);
        return callback(err, null);
      }
      callback(null, result);
    });
  },

  /**
   * Xóa chapter theo ID
   * @param {Number} chapterID - ID của chapter cần xóa.
   * @param {Function} callback - Hàm callback xử lý kết quả trả về (error, result).
   */
  deleteChapter: (chapterID, callback) => {
    const query = `
      DELETE FROM Chapter WHERE ChapterID = ?
    `;

    connection.query(query, [chapterID], (err, result) => {
      if (err) {
        console.log(`Fail to delete chapter: ${err}`);
        return callback(err, null);
      }
      callback(null, result);
    });
  },
};

module.exports = Chapter;
