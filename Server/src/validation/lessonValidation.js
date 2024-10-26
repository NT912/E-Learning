const { check, validationResult } = require("express-validator");

const chapterValidator = {
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
