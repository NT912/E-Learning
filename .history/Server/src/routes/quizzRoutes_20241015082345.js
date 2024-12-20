const express = require("express");
const QuizzController = require("../controllers/quizz/quizzController");

const router = express.Router();

// Tạo bài kiểm tra
router.post("/course/:courseId/chapter/:chapterId", QuizzController.createQuiz);

// Thêm câu hỏi vào bài kiểm tra
router.post("/:quizId/question", QuizzController.addQuestion);

// Nộp bài kiểm tra
router.post("/:quizId/submit", QuizzController.submitQuiz);

module.exports = router;
