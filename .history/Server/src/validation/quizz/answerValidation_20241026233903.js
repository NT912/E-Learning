const { check, validationResult } = require("express-validator");

const answerValidator = {
  create: [
    check("QuestionID").isInt().withMessage("Question ID must be an integer."),
    check("Content").notEmpty().withMessage("Content is required."),
    check("Score")
      .isFloat({ min: 0 })
      .withMessage("Score must be a positive float."),
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

module.exports = answerValidator;
