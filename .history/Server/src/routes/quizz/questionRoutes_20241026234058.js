const express = require("express");
const router = express.Router();
const questionController = require("../../controllers/questionController");
const questionValidator = require("../../validation/questionValidation");

router.post("/questions", questionValidator.create, questionController.create);
router.get(
  "/quizzes/:QuizzID/questions",
  questionController.getQuestionsByQuizzId
);

module.exports = router;
