const Quizz = require("../../models/quizz/quizzModel");

const QuizzService = {
  createQuizz: async (type, id) => {
    const quizId = await Quizz.create(type, id);
    return { quizId };
  },
};

module.exports = QuizzService;
