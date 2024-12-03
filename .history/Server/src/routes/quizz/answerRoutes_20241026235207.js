const express = require("express");
const router = express.Router();
const userAnswerController = require("../../controllers/userAnswerController");
const userAnswerValidator = require("../../validation/userAnswerValidation");

/**
 * @swagger
 * /userAnswers:
 *   post:
 *     summary: Submit a user's answer to a question
 *     tags: [UserAnswers]
 *     requestBody:
 *       description: Provide details of the user's answer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user submitting the answer
 *               questionID:
 *                 type: integer
 *                 description: ID of the question being answered
 *               answer:
 *                 type: string
 *                 description: User's answer to the question
 *     responses:
 *       201:
 *         description: User answer submitted successfully
 *       400:
 *         description: Invalid input or missing fields
 */

router.post(
  "/userAnswers",
  userAnswerValidator.create,
  userAnswerController.create
);
router.get(
  "/userAnswers/:UserID/:QuestionID",
  userAnswerController.getUserAnswerByUserAndQuestion
);

module.exports = router;
