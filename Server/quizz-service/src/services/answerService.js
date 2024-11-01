const Answer = require("../models/answerModel");

const answerService = {
  /**
   * Tạo câu trả lời mới cho một câu hỏi.
   * @param {Number} QuestionID - ID của câu hỏi.
   * @param {String} Content - Nội dung câu trả lời.
   * @param {Number} Score - Điểm của câu trả lời.
   * @return {Promise<Number>} - Promise chứa ID của câu trả lời mới tạo.
   */
  createAnswer: (QuestionID, Content, Score) => {
    return Answer.createAnswer([QuestionID, Content, Score]);
  },

  /**
   * Lấy danh sách câu trả lời theo ID của câu hỏi.
   * @param {Number} QuestionID - ID của câu hỏi.
   * @return {Promise<Array>} - Promise chứa danh sách câu trả lời.
   */
  getAnswersByQuestionId: (QuestionID) => {
    return Answer.findByQuestionId(QuestionID);
  },
};

module.exports = answerService;
