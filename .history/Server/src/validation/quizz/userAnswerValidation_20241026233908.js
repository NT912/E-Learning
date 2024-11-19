const { check, validationResult } = require("express-validator");

const userAnswerValidator = {
  create: [
    check("UserID").isInt().withMessage("User ID must be an integer."),
    check("QuestionID").isInt().withMessage("Question ID must be an integer."),
    check("AnswerID")
      .optional()
      .isInt()
      .withMessage("Answer ID must be an integer if provided."),
    check("AnswerContent")
      .optional()
      .isString()
      .withMessage("Answer content must be a string if provided."),
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

module.exports = userAnswerValidator;
