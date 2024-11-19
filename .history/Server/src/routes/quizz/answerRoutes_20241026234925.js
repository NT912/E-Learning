const express = require("express");
const router = express.Router();
const userAnswerController = require("../../controllers/userAnswerController");
const userAnswerValidator = require("../../validation/userAnswerValidation");

router.post(
  "/userAnswers",
  userAnswerValidator.create,
  userAnswerController.create
);
router.get(
  "/userAnswers/:UserID/:QuestionID",
  userAnswerController.getUserAnswerByUserAndQuestion
);

module.exports = router;
