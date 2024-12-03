const express = require("express");
const router = express.Router();
const answerController = require("../../controllers/answerController");
const answerValidator = require("../../validation/answerValidation");

router.post("/answers", answerValidator.create, answerController.create);
router.get(
  "/questions/:QuestionID/answers",
  answerController.getAnswersByQuestionId
);

module.exports = router;
