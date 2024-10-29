const { check, validationResult } = require("express-validator");

const outcomeValidator = {
  update: [
    check("content")
      .notEmpty()
      .withMessage("Content is required."),
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((err) => err.msg).join(", ")
        });
      }
      next();
    },
  ],
  create: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((err) => err.msg).join(", ")
        });
      }
      next();
    },
  ],
  delete: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isInt()
      .withMessage("User ID must be an integer."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((err) => err.msg).join(", ")
        });
      }
      next();
    },
  ],
};

module.exports = outcomeValidator;
