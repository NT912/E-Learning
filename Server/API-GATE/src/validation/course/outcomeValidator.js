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

const updateOutcome = [
  check("content")
    .notEmpty().withMessage("Content is required."),
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  handleValidationErrors,
];

const createOutcome = [
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  handleValidationErrors,
];

const deleteOutcome = [
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  handleValidationErrors,
];

module.exports = {
  updateOutcome,
  createOutcome,
  deleteOutcome,
};
