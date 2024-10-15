const connection = require("../config/db");

const Quizz = {
  create: async (chapterId, title) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO quizz (ChapterID, Title) VALUES (?, ?)`;
      connection.query(query, [chapterId, title], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  },

  addQuestion: async (quizId, questionContent, picture) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO question (QuizzID, Content, Picture) VALUES (?, ?, ?)`;
      connection.query(
        query,
        [quizId, questionContent, picture || null],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  addAnswer: async (questionId, answerContent, isCorrect) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO answer (QuestionID, Content, IsCorrect) VALUES (?, ?, ?)`;
      connection.query(
        query,
        [questionId, answerContent, isCorrect ? 1 : 0],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  submitAnswers: async (userId, quizId, answers) => {
    // Logic để tính toán điểm và lưu câu trả lời của học sinh
    // ... (code xử lý nộp bài kiểm tra)
  },
};

module.exports = Quizz;
