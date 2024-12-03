const { check, validationResult } = require("express-validator");
const CourseLevel = require("../../../config/data/courseLevel");

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

    updateCost: [
      check("amount")
      .notEmpty()
      .withMessage("Amount is required."),
      handleValidationErrors,
    ],

    updateDescription: [
      check("content")
      .notEmpty()
      .withMessage("Content is required."),
      handleValidationErrors,
    ],

    updateLevel: [
      check("level")
      .notEmpty()
      .withMessage("Level is required.")
      .isIn(Object.values(CourseLevel)) 
      .withMessage("Invalid level. Must be one of: begin, intermediate, advanced, mix."),
      handleValidationErrors,
    ],

    updateCategory: [
      check("categoryID")
      .notEmpty()
      .withMessage("categoryID is required."),
      handleValidationErrors,
    ]
};

module.exports = courseValidator;
