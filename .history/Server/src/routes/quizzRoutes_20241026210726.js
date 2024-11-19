const express = require("express");
const multer = require("multer");
const Role = require("../config/role");
const router = express.Router();

// Controller
const QuizzController = require("../controllers/quizz/quizzController");

// Middleware
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// Tạo bài kiểm tra
router.post(
  "/course/:courseId/chapter/:chapterId/lesson/:lessonID/create",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.TEACHER),
  QuizzController.createQuiz
);

// Thêm câu hỏi vào bài kiểm tra
router.post(
  "/:quizId/question",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.TEACHER),
  QuizzController.addQuestion
);

// Nộp bài kiểm tra
router.post(
  "/:quizId/submit",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.STUDENT),
  QuizzController.submitQuiz
);

module.exports = router;
