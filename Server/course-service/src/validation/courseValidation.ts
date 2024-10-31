import { Request, Response, NextFunction } from "express";
const { check, validationResult, ValidationError, Result } = require("express-validator");

// Middleware to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err: typeof ValidationError) => err.msg).join(", "),
    });
  }
  next();
};

// Validators
const courseValidator = {
  createCourse: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    handleValidationErrors,
  ],

  updateCourseName: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    check("courseName")
      .notEmpty()
      .withMessage("Course name is required.")
      .isLength({ max: 100 })
      .withMessage("Course name must not exceed 100 characters."),
    handleValidationErrors,
  ],

  updateCourseAvatar: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    check("file")
      .custom((value: any, { req }: { req: Request }) => !!req.file)
      .withMessage("File is required for avatar upload."),
    handleValidationErrors,
  ],

  updateCourseShortcut: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    check("content")
      .notEmpty()
      .withMessage("Shortcut content is required.")
      .isLength({ max: 300 })
      .withMessage("Shortcut content must not exceed 300 characters."),
    handleValidationErrors,
  ],

  updateCourseDescription: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    check("content")
      .notEmpty()
      .withMessage("Description is required.")
      .isLength({ max: 2000 })
      .withMessage("Description must not exceed 2000 characters."),
    handleValidationErrors,
  ],

  updateCourseCost: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    check("amount")
      .notEmpty()
      .withMessage("Amount is required.")
      .isFloat()
      .withMessage("Amount must be a positive number."),
    handleValidationErrors,
  ],

  confirmCourse: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    handleValidationErrors,
  ],
};

export default courseValidator;
