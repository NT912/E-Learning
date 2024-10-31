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

const chapterValidator = {
  create: [
    check("userID")
      .notEmpty().withMessage("User ID is required.")
      .isInt().withMessage("User ID must be an integer."),
    handleValidationErrors,
  ],

  update: [
    check("userID")
      .notEmpty().withMessage("User ID is required.")
      .isInt().withMessage("User ID must be an integer."),
    check("chapterName")
      .notEmpty().withMessage("Chapter name is required.")
      .isString().withMessage("Chapter name must be a string."),
    handleValidationErrors,
  ],

  delete: [
    check("userID")
      .notEmpty().withMessage("User ID is required.")
      .isInt().withMessage("User ID must be an integer."),
    handleValidationErrors,
  ],
};

export default chapterValidator;
