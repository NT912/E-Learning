const express = require("express");
const multer = require("multer");
const Role = require("../../config/data/role");
const router = express.Router();

// Controller
const QuizzController = require("../controllers/quizz/quizzController");

// Middleware
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const quizzValidator = require("../validation/quizzValidation");

// const quizzValidation = require("../")

// Tạo bài kiểm tra
/**
 * @swagger
 * /quizz/create:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     requestBody:
 *       description: Information needed to create a quiz
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: type of parent
 *                 example: Chapter or Lesson
 *               id:
 *                 type: integer
 *                 description: ID of the parent
 *                 example: 2
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       400:
 *         description: Invalid input or missing fields
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User does not have permission to create a quiz
 */

router.post(
  // "/course/:courseId/chapter/:chapterId/lesson/:lessonID/create",
  "/create",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.TEACHER),
  quizzValidator.create,
  QuizzController.createQuiz
);

module.exports = router;
