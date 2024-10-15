const connection = require("../../config/db");

const videoModel = {
  /**
   * Tạo một khóa học mới.
   * @param {Array} params - Mảng chứa [UserID, CreateAt].
   * @return {Promise<Number>} - Promise chứa ID của khóa học mới tạo.
   */
  createCourseByVideo: (link, chapterID, nameVideo, Time) => {
    const query = `
      INSERT INTO video (ChapterID, VideoLink, Title, Time)
      VALUES (?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, params, (err, result) => {
        if (err) {
          console.log(`Model Fail to create a course with UserID: ${err}`);
          return reject(err);
        }
        const insertedId = result.insertId;
        resolve(insertedId);
      });
    });
  },
};

module.exports = Course;
