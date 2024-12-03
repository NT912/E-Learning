const connection = require("../../config/db");

const Question = {
  create: (QuizzID, Content, Picture, QuestionType) => {
    const query = `INSERT INTO Question (QuizzID, Content, Picture, QuestionType) VALUES (?, ?, ?, ?)`;
    connection.query(
      query,
      [QuizzID, Content, Picture, QuestionType],
      (err, result) => {
        if (err) {
        }
      }
    );
  },
};
