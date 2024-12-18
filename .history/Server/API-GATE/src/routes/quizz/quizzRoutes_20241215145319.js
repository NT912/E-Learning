// routes/quizzRoutes.js
const express = require("express");
const router = express.Router();
const quizzController = require("../../controllers/quizz/quizzController");

/**
 * @swagger
 * /quizz/create:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizz]
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
 *                 description: Type of parent (e.g., Chapter or Lesson)
 *               id:
 *                 type: integer
 *                 description: ID of the parent
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       400:
 *         description: Invalid input or missing fields
 */
router.post("/create", quizzController.createQuiz);

/**
 * @swagger
 * /quizz/find:
 *   post:
 *     summary: Find a quiz by ID
 *     tags: [Quizz]
 *     requestBody:
 *       description: Provide quizzID to find a specific quiz
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizzID:
 *                 type: integer
 *                 description: ID of the quiz
 *               userID:
 *                 type: integer
 *                 description: Optional user ID
 *     responses:
 *       200:
 *         description: Quiz found successfully
 *       400:
 *         description: Invalid input or missing fields
 */
router.post("/find", quizzController.getQuizById);

/**
 * @swagger
 * /quizz/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       description: Details of the question to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               QuizzID:
 *                 type: integer
 *                 description: ID of the quiz the question belongs to
 *               Content:
 *                 type: string
 *                 description: Text content of the question
 *               QuestionType:
 *                 type: string
 *                 description: Type of the question (e.g., multiple_choice, short_answer, true_false)
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Invalid input or missing fields
 */
router.post("/questions", quizzController.createQuestion);

/**
 * @swagger
 * /quizz/quizzes/{QuizzID}/questions:
 *   get:
 *     summary: Get questions for a specific quiz
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: QuizzID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the quiz
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *       404:
 *         description: No questions found for the specified quiz
 */
router.get("/quizzes/:QuizzID/questions", quizzController.getQuestionsByQuiz);

/**
 * @swagger
 * /quizz/userAnswers:
 *   post:
 *     summary: Submit a user's answer
 *     tags: [User Answers]
 *     requestBody:
 *       description: Details of the user's answer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: integer
 *                 description: ID of the user
 *               QuestionID:
 *                 type: integer
 *                 description: ID of the question
 *               AnswerID:
 *                 type: integer
 *                 description: ID of the selected answer (if applicable)
 *               AnswerContent:
 *                 type: string
 *                 description: Text content of the answer (if applicable)
 *     responses:
 *       201:
 *         description: Answer submitted successfully
 *       400:
 *         description: Invalid input or missing fields
 */
router.post("/userAnswers", quizzController.submitUserAnswer);

/**
 * @swagger
 * /quizz/userAnswers/{UserID}/{QuestionID}:
 *   get:
 *     summary: Get user's answer for a specific question
 *     tags: [User Answers]
 *     parameters:
 *       - in: path
 *         name: UserID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: path
 *         name: QuestionID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the question
 *     responses:
 *       200:
 *         description: Answer retrieved successfully
 *       404:
 *         description: Answer not found
 */
router.get("/userAnswers/:UserID/:QuestionID", quizzController.getUserAnswer);

module.exports = router;
