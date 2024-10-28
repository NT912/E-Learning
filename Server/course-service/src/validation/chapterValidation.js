const { check, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => err.msg).join(", ")
    });
  }
  next();
};

const chapterValidator = {
  updateName: [
    check("chapterName")
      .notEmpty()
      .withMessage("Chapter name is required."), 
    handleValidationErrors,
  ],
};

module.exports = chapterValidator;
