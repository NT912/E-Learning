const QuizzService = require("../../services/quizz/quizzService");
const sendResponse = require("../../helpers/sendResponse");
const messages = require("../../config/message.json");

const QuizzController = {
  createQuiz: async (req, res) => {
    try {
      const { chapterId } = req.params;
      const { title } = req.body;
      const result = await QuizzService.createQuiz(chapterId, title);
      sendResponse(res, true, messages.quiz.createSuccess, "", result);
    } catch (error) {
      sendResponse(res, false, messages.quiz.createError, error.message);
    }
  },

  addQuestion: async (req, res) => {
    try {
      const { quizId } = req.params;
      const questionData = req.body;
      const result = await QuizzService.addQuestionToQuiz(quizId, questionData);
      sendResponse(res, true, messages.quiz.questionAddSuccess, "", result);
    } catch (error) {
      sendResponse(res, false, messages.quiz.questionAddError, error.message);
    }
  },

  submitQuiz: async (req, res) => {
    try {
      const { quizId } = req.params;
      const { userId, answers } = req.body;
      const result = await QuizzService.submitQuiz(userId, quizId, answers);
      if (result.score >= 6) {
        sendResponse(
          res,
          true,
          messages.quiz.pass,
          `You passed the quiz with a score of ${result.score}`
        );
      } else {
        sendResponse(
          res,
          false,
          messages.quiz.fail,
          messages.quiz.scoreBelowMin
        );
      }
    } catch (error) {
      sendResponse(res, false, messages.quiz.submitError, error.message);
    }
  },
};

module.exports = QuizzController;
