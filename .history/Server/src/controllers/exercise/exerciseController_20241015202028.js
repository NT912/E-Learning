const ExerciseService = require("../../services/exercise/exerciseService");
const sendResponse = require("../../helpers/sendResponse");
const messages = require("../../config/message.json");

const ExerciseController = {
  createExercise: async (req, res) => {
    try {
      const { lessonId, title, description, language } = req.body;

      // Kiểm tra các trường bắt buộc
      if (!lessonId) {
        return sendResponse(
          res,
          false,
          messages.exercise.createError.title,
          messages.exercise.createError.description.missingLessonId
        );
      }
      if (!title || !description || !language) {
        return sendResponse(
          res,
          false,
          messages.exercise.createError.title,
          messages.exercise.createError.description.missingFields
        );
      }

      const result = await ExerciseService.createExercise(
        lessonId,
        title,
        description,
        language
      );
      sendResponse(
        res,
        true,
        messages.exercise.createSuccess.title,
        messages.exercise.createSuccess.description,
        result
      );
    } catch (error) {
      sendResponse(
        res,
        false,
        messages.exercise.createError.title,
        messages.exercise.createError.description.databaseError
      );
    }
  },

  submitExercise: async (req, res) => {
    try {
      const { exerciseId, userId, code, language } = req.body;

      // Kiểm tra các trường bắt buộc
      if (!exerciseId || !userId || !code || !language) {
        return sendResponse(
          res,
          false,
          messages.exercise.submissionError.title,
          messages.exercise.submissionError.description.missingFields
        );
      }

      const result = await ExerciseService.submitCode(
        exerciseId,
        userId,
        code,
        language
      );
      sendResponse(
        res,
        result.status === "passed",
        messages.exercise.submissionSuccess.title,
        messages.exercise.submissionSuccess.description,
        result
      );
    } catch (error) {
      sendResponse(
        res,
        false,
        messages.exercise.submissionError.title,
        messages.exercise.submissionError.description.runtimeError
      );
    }
  },
};

module.exports = ExerciseController;
