const connection = require("../../config/db");

const Quizz = {
  create: (chapterId, title) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO quizz (ChapterID, Title) VALUES (?, ?)`;
      connection.query(query, [chapterId, title], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  },

  addQuestion: (quizId, content, picture) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO question (QuizzID, Content, Picture) VALUES (?, ?, ?)`;
      connection.query(
        query,
        [quizId, content, picture || null],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  addAnswer: (questionId, content, isCorrect) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO answer (QuestionID, Content, IsCorrect) VALUES (?, ?, ?)`;
      connection.query(
        query,
        [questionId, content, isCorrect ? 1 : 0],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  submitAnswers: (userId, quizId, answers) => {
    // Logic để tính toán điểm và lưu câu trả lời của học sinh
    return new Promise((resolve, reject) => {
      let totalScore = 0;
      let totalCorrect = 0;

      answers.forEach(async (answer, index) => {
        const query = `SELECT IsCorrect FROM answer WHERE AnswerID IN (?) AND QuestionID = ?`;
        connection.query(
          query,
          [answer.selectedAnswers, answer.questionId],
          (err, result) => {
            if (err) return reject(err);
            totalCorrect += result.filter((r) => r.IsCorrect === 1).length;
            totalScore += 10 / answers.length; // Tính điểm dựa trên số câu trả lời đúng
            if (index === answers.length - 1) resolve(totalScore);
          }
        );
      });
    });
  },
};

module.exports = Quizz;
