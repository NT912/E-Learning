const express = require("express");
const router = express.Router();
const multer = require("multer");
const questionController = require("../controllers/questionController");
const questionValidator = require("../../validation/questionValidation");

const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       description: Provide details of the question to be created
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               QuizzID:
 *                 type: integer
 *                 description: ID of the quiz to which this question belongs
 *               text:
 *                 type: string
 *                 description: The text content of the question
 *               Picture:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file associated with the question
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Invalid input or missing fields
 */

router.post(
  "/questions",
  upload.single("Picture"),
  questionValidator.create,
  questionController.create
);

/**
 * @swagger
 * /quizzes/{QuizzID}/questions:
 *   get:
 *     summary: Retrieve all questions for a specific quiz
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: QuizzID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the quiz to retrieve questions for
 *     responses:
 *       200:
 *         description: List of questions for the quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   questionID:
 *                     type: integer
 *                     description: ID of the question
 *                   text:
 *                     type: string
 *                     description: Text of the question
 *                   pictureURL:
 *                     type: string
 *                     description: URL of the question's image if available
 *       404:
 *         description: Quiz not found or no questions available for this quiz
 */

router.get(
  "/quizzes/:QuizzID/questions",
  questionController.getQuestionsByQuizzId
);

module.exports = router;
