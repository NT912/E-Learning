const connection = require("../../config/db");

const Quizz = {
  create: (chapterId, lessonId, title) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO quizz (chapterId, lessonId, Title) VALUES (?, ?)`;
      connection.query(query, [chapterId, lessonId, title], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  },
};

module.exports = Quizz;
