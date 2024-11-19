const Quizz = require("../../models/quizz/quizzModel");

const QuizzService = {
  createQuizz: async (type, id) => {
    const quizzId = await Quizz.create(type, id);
    return { quizId };
  },

  getQuizzById: async (type, id) => {
    const quizzId
  }
};

module.exports = QuizzService;
