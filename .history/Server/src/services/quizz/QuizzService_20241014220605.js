const Quizz = require("../models/QuizzModel");

const QuizzService = {
  createQuiz: async (chapterId, title) => {
    const quizId = await Quizz.create(chapterId, title);
    return { quizId };
  },

  addQuestionToQuiz: async (quizId, questionData) => {
    const { content, picture, answers } = questionData;
    const questionId = await Quizz.addQuestion(quizId, content, picture);

    // Thêm các câu trả lời
    for (const answer of answers) {
      await Quizz.addAnswer(questionId, answer.content, answer.isCorrect);
    }

    return { questionId };
  },

  submitQuiz: async (userId, quizId, answers) => {
    // Xử lý nộp bài kiểm tra và tính toán điểm
    const score = await Quizz.submitAnswers(userId, quizId, answers);
    return { score };
  },
};

module.exports = QuizzService;
