const QuizzService = require("../../services/quizz/quizzService");
const sendResponse = require("../../helpers/sendResponse");

const QuizzController = {
  createQuiz: async (req, res) => {
    try {
      const { type, id } = req.body;

      const result = await QuizzService.createQuizz(type, id);
      sendResponse(res, true, "Quiz created successfully", "", result);
    } catch (error) {
      sendResponse(res, false, "Failed to create quiz", error.message);
    }
  },

  findById:
};

module.exports = QuizzController;
