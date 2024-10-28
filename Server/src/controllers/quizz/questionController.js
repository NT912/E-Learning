const questionService = require("../services/questionService");

const questionController = {
  /**
   * Tạo một câu hỏi mới.
   * @param {Object} req - Yêu cầu từ client. Chứa thông tin câu hỏi và file ảnh (nếu có).
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  create: async (req, res) => {
    const { QuizzID, Content, QuestionType } = req.body;
    const PictureFile = req.file; // File ảnh được tải lên

    try {
      const questionID = await questionService.createQuestion(
        QuizzID,
        Content,
        PictureFile,
        QuestionType
      );
      res.status(201).json({ questionID });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Lấy danh sách câu hỏi theo bài kiểm tra.
   * @param {Object} req - Yêu cầu từ client. Chứa ID của bài kiểm tra.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  getQuestionsByQuizzId: async (req, res) => {
    const { QuizzID } = req.params;
    try {
      const questions = await questionService.getQuestionsByQuizzId(QuizzID);
      res.json(questions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = questionController;
