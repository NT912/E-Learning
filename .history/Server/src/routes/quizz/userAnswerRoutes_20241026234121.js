const express = require("express");
const router = express.Router();
const userAnswerController = require("../../controllers/userAnswerController");
const userAnswerValidator = require("../../validation/userAnswerValidation");

router.post(
  "/userAnswers",
  userAnswerValidator.create,
  userAnswerController.create
);

module.exports = router;
