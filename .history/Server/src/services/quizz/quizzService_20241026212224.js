const Quizz = require("../../models/quizz/quizzModel");

const QuizzService = {
  createQuizz: async (chapterId, lessonId, title) => {
    const quizId = await Quizz.create(chapterId, lessonId, title);
    return { quizId };
  },
};

module.exports = QuizzService;
