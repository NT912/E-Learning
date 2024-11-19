const answerService = require("../services/answerService");

const answerController = {
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
