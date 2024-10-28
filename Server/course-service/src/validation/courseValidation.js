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

const courseValidator = {
  updateCourseName: [
    check("courseName")
      .notEmpty()
      .withMessage("Course name is required."),
    handleValidationErrors,
  ],

  updateCourseShortcut: [
    check("content")
      .notEmpty()
      .withMessage("Content is required.")
      .isLength({ max: 300 })
      .withMessage("Content must not exceed 300 characters."),
    handleValidationErrors,
  ],

  updateCourseDescription: [
    check("content")
      .notEmpty()
      .withMessage("Content is required."),
    handleValidationErrors,
  ],

  updateCourseCost: [
    check("amount")
      .notEmpty()
      .withMessage("Amount is required."),
    handleValidationErrors,
  ],
};

module.exports = courseValidator;
