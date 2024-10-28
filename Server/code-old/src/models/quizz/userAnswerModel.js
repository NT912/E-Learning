const connection = require("../../../config/database/db");

const UserAnswer = {
  /**
   * Lưu câu trả lời của người dùng cho một câu hỏi.
   * @param {Array} userAnswerData - Mảng chứa các thông tin của câu trả lời của người dùng.
   * @return {Promise<Number>} - Promise chứa ID của câu trả lời của người dùng mới tạo.
   */
  createUserAnswer: (userAnswerData) => {
    const query = `
      INSERT INTO UserAnswer (UserID, QuestionID, AnswerID, AnswerContent)
      VALUES (?, ?, ?, ?);
    `;
    return new Promise((resolve, reject) => {
      connection.query(query, userAnswerData, (err, result) => {
        if (err) {
          console.log(`Failed to create user answer: ${err}`);
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  },

  /**
   * Tìm câu trả lời của người dùng theo ID câu hỏi và ID người dùng.
   * @param {Number} userID - ID của người dùng.
   * @param {Number} questionID - ID của câu hỏi.
   * @return {Promise<Object>} - Promise chứa câu trả lời của người dùng hoặc null.
   */
  findByUserAndQuestion: (userID, questionID) => {
    const query = `
      SELECT * FROM UserAnswer WHERE UserID = ? AND QuestionID = ?;
    `;
    return new Promise((resolve, reject) => {
      connection.query(query, [userID, questionID], (err, results) => {
        if (err) {
          console.log(`Failed to find user answer: ${err}`);
          return reject(err);
        }
        resolve(results[0] || null);
      });
    });
  },
};

module.exports = UserAnswer;
