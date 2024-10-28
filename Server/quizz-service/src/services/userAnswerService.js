const UserAnswer = require("../models/userAnswerModel");

const userAnswerService = {
  /**
   * Lưu câu trả lời của người dùng cho một câu hỏi.
   * @param {Number} UserID - ID của người dùng.
   * @param {Number} QuestionID - ID của câu hỏi.
   * @param {Number} AnswerID - ID của câu trả lời (nếu có).
   * @param {String} AnswerContent - Nội dung câu trả lời của người dùng (nếu là câu trả lời ngắn).
   * @return {Promise<Number>} - Promise chứa ID của câu trả lời của người dùng mới tạo.
   */
  createUserAnswer: (UserID, QuestionID, AnswerID, AnswerContent) => {
    return UserAnswer.createUserAnswer([
      UserID,
      QuestionID,
      AnswerID,
      AnswerContent,
    ]);
  },

  /**
   * Lấy câu trả lời của người dùng theo ID câu hỏi và ID người dùng.
   * @param {Number} UserID - ID của người dùng.
   * @param {Number} QuestionID - ID của câu hỏi.
   * @return {Promise<Object>} - Promise chứa câu trả lời của người dùng hoặc null.
   */
  getUserAnswerByUserAndQuestion: (UserID, QuestionID) => {
    return UserAnswer.findByUserAndQuestion(UserID, QuestionID);
  },
};

module.exports = userAnswerService;
