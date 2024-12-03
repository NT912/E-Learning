const connection = require("../../config/db");

const Question = {
  create: (QuizzID, Content, Picture, QuestionType) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Question (QuizzID, Content, Picture, QuestionType) VALUES (?, ?, ?, ?)`;
      connection.query(
        query,
        [QuizzID, Content, Picture, QuestionType],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result.insertId);
        }
      );
    });
  },

  findById: (QuizzID) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Question WHERE QuizzID = ?`;
      connection.query(query, [QuizzID], (err, result) => {
        if (err) {
          console.log(`Fail to find lesson by ID: ${err}`);
        }
      });
    });
  },
};
