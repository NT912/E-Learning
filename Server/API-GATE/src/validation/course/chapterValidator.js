const { check, validationResult } = require("express-validator");

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => err.msg).join(", "),
    });
  }
  next();
};

// Validators
const chapterValidator = {
  update: [
    check("title")
    .notEmpty()
    .withMessage("Title is required."),
    handleValidationErrors,
],
};

module.exports = chapterValidator;
