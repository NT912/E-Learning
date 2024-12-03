const Quizz = require("../../models/quizz/quizzModel");

const QuizzService = {
  createQuiz: async (lessonId, title) => {
    const quizId = await Quizz.create(lessonId, title);
    return { quizId };
  },

  addQuestionToQuiz: async (quizId, questionData) => {
    const { content, picture, answers } = questionData;
    const questionId = await Quizz.addQuestion(quizId, content, picture);

    for (const answer of answers) {
      await Quizz.addAnswer(questionId, answer.content, answer.isCorrect);
    }

    return { questionId };
  },

  submitQuiz: async (userId, quizId, answers) => {
    const score = await Quizz.submitAnswers(userId, quizId, answers);
    return { score };
  },
};

module.exports = QuizzService;
