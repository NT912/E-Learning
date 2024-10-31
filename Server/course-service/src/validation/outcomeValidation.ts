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

export const updateOutcome = [
  check("content")
    .notEmpty().withMessage("Content is required."),
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  handleValidationErrors,
];

export const createOutcome = [
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  handleValidationErrors,
];

export const deleteOutCome = [
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  handleValidationErrors,
];

export default {
  updateOutcome,
  createOutcome,
  deleteOutCome,
};