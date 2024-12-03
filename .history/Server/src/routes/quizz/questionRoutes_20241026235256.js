const express = require("express");
const router = express.Router();
const multer = require("multer");
const questionController = require("../../controllers/questionController");
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
router.get(
  "/quizzes/:QuizzID/questions",
  questionController.getQuestionsByQuizzId
);

module.exports = router;
