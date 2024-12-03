const connection = require("../../config/database/db");

const Answer = {
  /**
   * Tạo câu trả lời mới cho câu hỏi.
   * @param {Array} answerData - Mảng chứa các thông tin của câu trả lời.
   * @return {Promise<Number>} - Promise chứa ID của câu trả lời mới tạo.
   */
  createAnswer: (answerData) => {
    const query = `
      INSERT INTO Answer (QuestionID, Content, Score)
      VALUES (?, ?, ?);
    `;
    return new Promise((resolve, reject) => {
      connection.query(query, answerData, (err, result) => {
        if (err) {
          console.log(`Failed to create answer: ${err}`);
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  },

  /**
   * Tìm danh sách câu trả lời theo ID của câu hỏi.
   * @param {Number} questionID - ID của câu hỏi.
   * @return {Promise<Array>} - Promise chứa danh sách các câu trả lời.
   */
  findByQuestionId: (questionID) => {
    const query = `SELECT * FROM Answer WHERE QuestionID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [questionID], (err, results) => {
        if (err) {
          console.log(`Failed to find answers by question ID: ${err}`);
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = Answer;
