const ExerciseService = require("../../services/exercise/exerciseService");
const sendResponse = require("../../helpers/sendResponse");

const ExerciseController = {
  createExercise: async (req, res) => {
    try {
      const { lessonId, title, description, language } = req.body;
      const result = await ExerciseService.createExercise(
        lessonId,
        title,
        description,
        language
      );
      sendResponse(res, true, "Exercise created successfully", "", result);
    } catch (error) {
      sendResponse(res, false, "Failed to create exercise", error.message);
    }
  },

  submitExercise: async (req, res) => {
    try {
      const { exerciseId, userId, code, language } = req.body;
      const result = await ExerciseService.submitCode(
        exerciseId,
        userId,
        code,
        language
      );
      sendResponse(
        res,
        result.status === "passed",
        result.status === "passed" ? "Exercise passed" : "Exercise failed",
        result.output,
        result
      );
    } catch (error) {
      sendResponse(res, false, "Failed to submit exercise", error.message);
    }
  },
};

module.exports = ExerciseController;
