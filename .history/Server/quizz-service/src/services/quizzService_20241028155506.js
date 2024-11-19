const Quizz = require("../../modelsquizzModel");

const QuizzService = {
  createQuizz: async (type, id) => {
    const quizzId = await Quizz.create(type, id);
    return { quizzId };
  },

  getQuizzById: async (type, id) => {
    const quizzId = await Quizz.findById(type, id);
    return { quizzId };
  },
};

module.exports = QuizzService;