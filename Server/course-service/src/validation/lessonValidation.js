const { check, validationResult } = require("express-validator");

const lessonValidation = {
  create: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required")
      .isInt()
      .withMessage("User ID must be an integer"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  update: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required")
      .isInt()
      .withMessage("User ID must be an integer"),
    check("title")
      .optional()
      .isString()
      .withMessage("Title must be a string"),
    check("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  delete: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required")
      .isInt()
      .withMessage("User ID must be an integer"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  updateAllowDemo: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required")
      .isInt()
      .withMessage("User ID must be an integer"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  get: [
    (req, res, next) => {
      const { lessonID } = req.params;
      if (!lessonID || isNaN(lessonID)) {
        return res.status(400).json({
          errors: [{ msg: "Lesson ID is required and must be an integer" }],
        });
      }
      next();
    },
  ],
};

module.exports = lessonValidation;
