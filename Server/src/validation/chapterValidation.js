const { check, validationResult } = require("express-validator");
const message = require("../config/message.json");
const { updateName } = require("../models/course/courseModel");

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
      .withMessage(message.chapter.creationError.missNameChapter), 
    handleValidationErrors,
  ],
};

module.exports = chapterValidator;
