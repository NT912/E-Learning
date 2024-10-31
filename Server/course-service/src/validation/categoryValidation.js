const { check, validationResult } = require("express-validator");

const categoryValidator = {
  create: [
    check("name")
      .notEmpty()
      .withMessage("Category name is required.")
      .isString()
      .withMessage("Category name must be a string."),
    check("description")
      .notEmpty()
      .withMessage("Category description is required.")
      .isString()
      .withMessage("Description must be a string."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  update: [
    check("name")
      .notEmpty()
      .withMessage("Category name is required."),
    check("description")
      .notEmpty()
      .withMessage("Category description is required."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

module.exports = categoryValidator;
