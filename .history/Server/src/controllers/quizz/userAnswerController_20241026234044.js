const userAnswerService = require("../services/userAnswerService");

const userAnswerController = {
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
};

module.exports = userAnswerController;
