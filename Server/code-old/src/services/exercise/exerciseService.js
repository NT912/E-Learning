const axios = require("axios");
const Exercise = require("../../models/exercise/exerciseModel");

const ExerciseService = {
  createExercise: async (lessonId, title, description, language) => {
    const exerciseId = await Exercise.createExercise(
      lessonId,
      title,
      description,
      language
    );
    return { exerciseId };
  },

  submitCode: async (exerciseId, userId, code, language) => {
    const exercise = await Exercise.getExerciseById(exerciseId);

    const languageId = ExerciseService.getLanguageId(language);
    const result = await ExerciseService.runCodeWithJudge0(languageId, code);

    if (result.error) {
      return { success: false, message: "Syntax error or runtime error." };
    }

    const status = result.success ? "passed" : "failed";
    const score = result.success ? 10 : 0;

    const submissionId = await Exercise.submitExercise(
      exerciseId,
      userId,
      code,
      language,
      result.output,
      score,
      status
    );

    return { submissionId, score, status, output: result.output };
  },

  runCodeWithJudge0: async (languageId, code) => {
    try {
      const response = await axios.post("https://api.judge0.com/submissions", {
        source_code: code,
        language_id: languageId,
      });
      const { token } = response.data;
      let result;
      while (!result || result.status.id <= 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const resultResponse = await axios.get(
          `https://api.judge0.com/submissions/${token}`
        );
        result = resultResponse.data;
      }
      if (result.status.id !== 3) {
        return { error: true, output: result.stderr || result.message };
      }
      return { success: true, output: result.stdout };
    } catch (error) {
      throw new Error("Failed to run code with Judge0");
    }
  },

  getLanguageId: (language) => {
    switch (language) {
      case "python":
        return 71; // Python 3
      case "javascript":
        return 63; // Node.js
      case "c":
        return 50; // C (GCC)
      case "csharp":
        return 51; // C#
      case "java":
        return 62; // Java
      case "ruby":
        return 72; // Ruby
      case "php":
        return 68; // PHP
      case "go":
        return 60; // Go
      default:
        throw new Error("Unsupported language");
    }
  },
};

module.exports = ExerciseService;
