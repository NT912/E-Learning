const Question = require("../models/questionModel");
const firebaseHelper = require("../../helpers/firebaseHelper");
const message = require("../../../config/message.json");

const questionService = {
  /**
   * Tạo một câu hỏi mới trong bài kiểm tra.
   * @param {Number} QuizzID - ID của bài kiểm tra.
   * @param {String} Content - Nội dung câu hỏi.
   * @param {Object} PictureFile - File ảnh của câu hỏi (nếu có).
   * @param {String} QuestionType - Loại câu hỏi (trắc nghiệm, trả lời ngắn, đúng/sai).
   * @return {Promise<Number>} - Promise chứa ID của câu hỏi mới tạo.
   */
  createQuestion: async (QuizzID, Content, PictureFile, QuestionType) => {
    let pictureLink = null;

    // Nếu có file ảnh, upload lên Firebase
    if (PictureFile) {
      try {
        pictureLink = await firebaseHelper.uploadFile(PictureFile);
      } catch (error) {
        console.error("Failed to upload picture to Firebase:", error);
        throw new Error(
          message.question.creationError.description.uploadFailed
        );
      }
    }

    // Tạo câu hỏi trong cơ sở dữ liệu
    return Question.createQuestion([
      QuizzID,
      Content,
      pictureLink,
      QuestionType,
    ]);
  },

  /**
   * Lấy danh sách câu hỏi theo ID của bài kiểm tra.
   * @param {Number} QuizzID - ID của bài kiểm tra.
   * @return {Promise<Array>} - Promise chứa danh sách câu hỏi.
   */
  getQuestionsByQuizzId: (QuizzID) => {
    return Question.findByQuizzId(QuizzID);
  },
};

module.exports = questionService;
