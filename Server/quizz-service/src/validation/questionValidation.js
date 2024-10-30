const { check, validationResult } = require("express-validator");

const questionValidator = {
  create: [
    check("QuizzID").isInt().withMessage("Quizz ID must be an integer."),
    check("Content").notEmpty().withMessage("Content is required."),
    check("QuestionType")
      .isIn(["multiple_choice", "short_answer", "true_false"])
      .withMessage("Invalid question type."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((err) => err.msg),
        });
      }
      next();
    },
  ],
};

module.exports = questionValidator;
