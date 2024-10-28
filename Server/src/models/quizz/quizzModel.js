const connection = require("../../../config/database/db");


const Quizz = {
  // create: (chapterId, lessonId, title) => {
  //   return new Promise((resolve, reject) => {
  //     const query = `INSERT INTO quizz (ChapterID, LessonID, Title) VALUES (?, ?, ?)`;
  //     connection.query(query, [chapterId, lessonId, title], (err, result) => {
  //       if (err) return reject(err);
  //       resolve(result.insertId);
  //     });
  //   });
  // },

  create: (type, id) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO quizz (${type}ID) VALUES (?)`;
      connection.query(query, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  },

  findById: (quizzId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM quizz WHERE (QuizzID) = ?`;
      connection.query(query, [quizzId], (err, result) => {
        if (err) {
          console.log(`Fail to find lesson by ID: ${err}`);
          return reject(err);
        }
        const quizz = result[0] || null;
        resolve(quizz);
      });
    });
  },
};

module.exports = Quizz;
