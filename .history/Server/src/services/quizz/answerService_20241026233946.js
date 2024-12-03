const Answer = require("../models/answerModel");

const answerService = {
  createAnswer: (QuestionID, Content, Score) => {
    return Answer.createAnswer([QuestionID, Content, Score]);
  },

  getAnswersByQuestionId: (QuestionID) => {
    return Answer.findByQuestionId(QuestionID);
  },
};

module.exports = answerService;
