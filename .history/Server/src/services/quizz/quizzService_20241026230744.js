const Quizz = require("../../models/quizz/quizzModel");

const QuizzService = {
  createQuizz: async (type, id) => {
    const quizzId = await Quizz.create(type, id);
    return { quizzId };
  },

  getQuizzById: async (type, id) => {
    const quizzId
  }
};

module.exports = QuizzService;
