const Question = require("../models/questionModel");

const questionService = {
  createQuestion: (QuizzID, Content, Picture, QuestionType) => {
    return Question.createQuestion([QuizzID, Content, Picture, QuestionType]);
  },

  getQuestionsByQuizzId: (QuizzID) => {
    return Question.findByQuizzId(QuizzID);
  },
};

module.exports = questionService;
