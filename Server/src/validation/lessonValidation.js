const { check, validationResult } = require("express-validator");

const chapterValidator = {
  create: [
    check("chapterID")
      .notEmpty()
      .withMessage("Chapter ID is required."),
    
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map(err => err.msg).join(", ")
        });
      }
      next();
    },
  ],

  update: [
    check("name")
      .notEmpty()
      .withMessage("Title is required."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map(err => err.msg),
        });
      }
      next();
    },
  ],
};

module.exports = chapterValidator;
