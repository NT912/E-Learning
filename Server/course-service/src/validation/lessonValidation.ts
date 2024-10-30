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

export const create = [
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  handleValidationErrors,
];

export const update = [
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  check("title")
    .optional()
    .isString().withMessage("Title must be a string."),
  check("description")
    .optional()
    .isString().withMessage("Description must be a string."),
  handleValidationErrors,
];

export const deleteALesson = [
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  handleValidationErrors,
];

export const updateLessonAllowDemo = [
  check("userID")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  handleValidationErrors,
];

export const getLessonById = [
  check("lessonID")
    .notEmpty().withMessage("Lesson ID is required.")
    .isInt().withMessage("Lesson ID must be an integer."),
  handleValidationErrors,
];

export default {
  create,
  update,
  deleteALesson,
  updateLessonAllowDemo,
  getLessonById,
};