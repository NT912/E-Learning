const express = require("express");
const QuizzController = require("../controllers/QuizzController");

const router = express.Router();

// Tạo bài kiểm tra
router.post(
  "/course/:courseId/chapter/:chapterId/quiz",
  QuizzController.createQuiz
);

// Thêm câu hỏi vào bài kiểm tra
router.post("/quiz/:quizId/question", QuizzController.addQuestion);

// Nộp bài kiểm tra
router.post("/quiz/:quizId/submit", QuizzController.submitQuiz);

module.exports = router;
