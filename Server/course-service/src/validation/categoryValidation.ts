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

// Validators for Category operations
const categoryValidator = {
  createCategory: [
    check("name")
      .notEmpty().withMessage("Category name is required.")
      .isString().withMessage("Category name must be a string."),
    check("description")
      .optional()
      .isString().withMessage("Description must be a string."),
    handleValidationErrors,
  ],

  updateCategory: [
    check("categoryID")
      .notEmpty().withMessage("Category ID is required.")
      .isInt().withMessage("Category ID must be an integer."),
    check("name")
      .optional()
      .isString().withMessage("Category name must be a string."),
    check("description")
      .optional()
      .isString().withMessage("Description must be a string."),
    handleValidationErrors,
  ],

  deleteCategory: [
    check("categoryID")
      .notEmpty().withMessage("Category ID is required.")
      .isInt().withMessage("Category ID must be an integer."),
    handleValidationErrors,
  ],
};

export default categoryValidator;
