const connection = require("../../config/database/db");

const Question = {
  /**
   * Tạo câu hỏi mới trong bài kiểm tra.
   * @param {Array} questionData - Mảng chứa các thông tin của câu hỏi.
   * @return {Promise<Number>} - Promise chứa ID của câu hỏi mới tạo.
   */
  createQuestion: (questionData) => {
    const query = `
      INSERT INTO Question (QuizzID, Content, Picture, QuestionType)
      VALUES (?, ?, ?, ?);
    `;
    return new Promise((resolve, reject) => {
      connection.query(query, questionData, (err, result) => {
        if (err) {
          console.log(`Failed to create question: ${err}`);
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  },

  /**
   * Lấy danh sách câu hỏi theo ID của bài kiểm tra.
   * @param {Number} quizzID - ID của bài kiểm tra.
   * @return {Promise<Array>} - Promise chứa danh sách các câu hỏi.
   */
  findByQuizzId: (quizzID) => {
    const query = `SELECT * FROM Question WHERE QuizzID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [quizzID], (err, results) => {
        if (err) {
          console.log(`Failed to find questions by quiz ID: ${err}`);
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = Question;
