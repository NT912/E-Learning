const QuizzService = require("../../services/quizz/quizzService");
const sendResponse = require("../../helpers/sendResponse");

const QuizzController = {
  createQuiz: async (req, res) => {
    try {
      const { type, id } = req.body;

      const result = await QuizzService.createQuizz(type, id);
      sendResponse(res, true, "Quizz created successfully", "", result);
    } catch (error) {
      sendResponse(res, false, "Failed to create quiz", error.message);
    }
  },

  getQuizzById: async (req, res) => {
    try {
      const { type, id } = req.body;

      const result = await QuizzService.getQuizzById(type, id);
      sendResponse(res, true, "Quizz found");
    } catch (error) {}
  },
};

module.exports = QuizzController;
