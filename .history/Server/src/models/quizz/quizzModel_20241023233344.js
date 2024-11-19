const connection = require("../../config/db");

const Quizz = {
  create: (chapterId, lessonId, title) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO quizz (ChapterID, LessonID, Title) VALUES (?, ?, ?)`;
      connection.query(query, [chapterId, lessonId, title], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  },

  findById: (quizzId, callback) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM quizz WHERE (QuizzID) VALUES (?)`;
      connection.query(query, [quizzId, callback], (err, result) => {
        if (err) {
          console.log("Can not find Quizz by ID: ${err}");
          return reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = Quizz;
