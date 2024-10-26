const Quizz = require("../../models/quizz/quizzModel");

const QuizzService = {
  createQuizz: async (chapterId, lessonId, title) => {
    const quizId = await Quizz.create(chapterId, lessonId, title);
    return { quizId };
  },

  createQuizz: (Title, LessonID, ChapterID, Course) => {
    Quizz.create(Title, LessonID, ChapterID, Course);
  },
};

module.exports = QuizzService;
