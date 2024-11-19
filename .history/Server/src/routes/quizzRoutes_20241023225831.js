const express = require("express");
const multer = require("multer");
const Role = require("../config/role");
const router = express.Router();

// Controller
const QuizzController = require("../controllers/quizz/quizzController");

// Middleware
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Tạo bài kiểm tra
router.post(
  "/course/:courseId/chapter/:chapterId/lesson/:lessonID",
  QuizzController.createQuiz
);

// Thêm câu hỏi vào bài kiểm tra
router.post("/:quizId/question", QuizzController.addQuestion);

// Nộp bài kiểm tra
router.post("/:quizId/submit", QuizzController.submitQuiz);

module.exports = router;
