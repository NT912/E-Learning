// src/validation/progressValidation.ts
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

// Validators for Progress operations
const progressValidator = {
  // Validation for creating a new progress record
  createProgress: [
    check("lessonID")
      .notEmpty().withMessage("Lesson ID is required.")
      .isInt({ min: 1 }).withMessage("Lesson ID must be a positive integer."),
    handleValidationErrors,
  ],

  // Validation for updating an existing progress record
  updateProgress: [
    check("progressTime")
      .optional()
      .isInt({ min: 0 }).withMessage("Progress time must be a non-negative integer."),
    check("isCompleted")
      .optional()
      .isBoolean().withMessage("IsCompleted must be a boolean value."),
    handleValidationErrors,
  ],
};

export default progressValidator;
