const questionService = require("../services/questionService");

const questionController = {
  create: async (req, res) => {
    const { QuizzID, Content, Picture, QuestionType } = req.body;
    try {
      const questionID = await questionService.createQuestion(
        QuizzID,
        Content,
        Picture,
        QuestionType
      );
      res.status(201).json({ questionID });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

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
