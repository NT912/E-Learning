const express = require("express");
const router = express.Router();
const multer = require("multer");
const questionController = require("../../controllers/questionController");
const questionValidator = require("../../validation/questionValidation");

const upload = multer({ dest: "uploads/" });

router.post(
  "/questions",
  upload.single("Picture"),
  questionValidator.create,
  questionController.create
);
router.get(
  "/quizzes/:QuizzID/questions",
  questionController.getQuestionsByQuizzId
);

module.exports = router;
