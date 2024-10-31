const { check, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => err.msg).join(", ")
    });
  }
  next();
};

const chapterValidator = {
  create: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    handleValidationErrors,
  ],

  updateName: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    check("chapterName")
      .notEmpty()
      .withMessage("Chapter name is required."),
    handleValidationErrors,
  ],

  delete: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    handleValidationErrors,
  ],
};

module.exports = chapterValidator;
