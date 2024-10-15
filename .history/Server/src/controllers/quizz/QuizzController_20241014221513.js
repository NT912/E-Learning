const QuizzService = require("../../services/quizz/quizzService");
const sendResponse = require("../helpers/sendResponse");

const QuizzController = {
  createQuiz: async (req, res) => {
    try {
      const { courseId, chapterId } = req.params;
      const { title } = req.body;
      const result = await QuizzService.createQuiz(chapterId, title);
      sendResponse(res, true, "Quiz created successfully", "", result);
    } catch (error) {
      sendResponse(res, false, "Failed to create quiz", error.message);
    }
  },

  addQuestion: async (req, res) => {
    try {
      const { quizId } = req.params;
      const questionData = req.body;
      const result = await QuizzService.addQuestionToQuiz(quizId, questionData);
      sendResponse(res, true, "Question added successfully", "", result);
    } catch (error) {
      sendResponse(res, false, "Failed to add question", error.message);
    }
  },

  submitQuiz: async (req, res) => {
    try {
      const { quizId } = req.params;
      const { userId, answers } = req.body;
      const result = await QuizzService.submitQuiz(userId, quizId, answers);
      if (result.score >= 6) {
        sendResponse(res, true, "Quiz passed", `Your score is ${result.score}`);
      } else {
        sendResponse(
          res,
          false,
          "Quiz failed",
          `Your score is ${result.score}. You must retake the quiz.`
        );
      }
    } catch (error) {
      sendResponse(res, false, "Failed to submit quiz", error.message);
    }
  },
};

module.exports = QuizzController;
