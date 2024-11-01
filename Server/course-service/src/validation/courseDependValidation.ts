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

const courseDependValidator = {
  addCourseDepend: [
    check("userID")
      .notEmpty().withMessage("User ID is required")
      .isInt({ min: 1 }).withMessage("User ID must be a positive integer"),
    check("dependOnCourseID")
      .notEmpty().withMessage("Dependency Course ID is required")
      .isInt({ min: 1 }).withMessage("Dependency Course ID must be a positive integer"),
    check("isRequire")
      .notEmpty().withMessage("isRequire is required")
      .isBoolean().withMessage("isRequire must be a boolean value"),
    handleValidationErrors,
  ],

  removeCourseDepend: [
    check("userID")
      .notEmpty().withMessage("User ID is required")
      .isInt({ min: 1 }).withMessage("User ID must be a positive integer"),
    handleValidationErrors,
  ],
};

export default courseDependValidator;
