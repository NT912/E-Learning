const answerService = require("../services/answerService");

const answerController = {
  /**
   * Tạo một câu trả lời mới.
   * @param {Object} req - Yêu cầu từ client. Chứa thông tin câu trả lời.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  create: async (req, res) => {
    const { QuestionID, Content, Score } = req.body;
    try {
      const answerID = await answerService.createAnswer(
        QuestionID,
        Content,
        Score
      );
      res.status(201).json({ answerID });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Lấy danh sách câu trả lời theo câu hỏi.
   * @param {Object} req - Yêu cầu từ client. Chứa ID của câu hỏi.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  getAnswersByQuestionId: async (req, res) => {
    const { QuestionID } = req.params;
    try {
      const answers = await answerService.getAnswersByQuestionId(QuestionID);
      res.json(answers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = answerController;
