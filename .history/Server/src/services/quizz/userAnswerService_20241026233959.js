const UserAnswer = require("../models/userAnswerModel");

const userAnswerService = {
  createUserAnswer: (UserID, QuestionID, AnswerID, AnswerContent) => {
    return UserAnswer.createUserAnswer([
      UserID,
      QuestionID,
      AnswerID,
      AnswerContent,
    ]);
  },

  getUserAnswerByUserAndQuestion: (UserID, QuestionID) => {
    return UserAnswer.findByUserAndQuestion(UserID, QuestionID);
  },
};

module.exports = userAnswerService;
