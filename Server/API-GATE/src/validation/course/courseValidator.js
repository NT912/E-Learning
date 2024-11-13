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
const courseValidator = {
    updateCourseName: [
        check("courseName")
        .notEmpty()
        .withMessage("Course name is required.")
        .isLength({ max: 100 })
        .withMessage("Course name must not exceed 100 characters."),
        handleValidationErrors,
    ],

    updateCourseAvatar: [
        check("file")
        .custom((value, { req }) => {
            if (!req.file) {
            throw new Error("File is required for avatar upload.");
            }
            return true;
        }),
        handleValidationErrors,
    ],

    updateShortcut: [
        check("content")
        .notEmpty()
        .withMessage("Content name is required.")
        .isLength({ max: 300 })
        .withMessage("Course name must not exceed 300 characters."),
        handleValidationErrors,
    ],
};

module.exports = courseValidator;
