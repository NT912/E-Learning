const userAnswerService = require("../services/userAnswerService");

const userAnswerController = {
  /**
   * Lưu câu trả lời của người dùng.
   * @param {Object} req - Yêu cầu từ client. Chứa thông tin câu trả lời của người dùng.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  create: async (req, res) => {
    const { UserID, QuestionID, AnswerID, AnswerContent } = req.body;
    try {
      const userAnswerID = await userAnswerService.createUserAnswer(
        UserID,
        QuestionID,
        AnswerID,
        AnswerContent
      );
      res.status(201).json({ userAnswerID });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Lấy câu trả lời của người dùng cho một câu hỏi.
   * @param {Object} req - Yêu cầu từ client. Chứa ID của người dùng và ID của câu hỏi.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  getUserAnswerByUserAndQuestion: async (req, res) => {
    const { UserID, QuestionID } = req.params;
    try {
      const userAnswer = await userAnswerService.getUserAnswerByUserAndQuestion(
        UserID,
        QuestionID
      );
      if (userAnswer) {
        res.json(userAnswer);
      } else {
        res.status(404).json({ error: "User answer not found." });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = userAnswerController;
