const { check, validationResult } = require("express-validator");
const message = require("../../config/message.json");

const typeQuizz = Object.freeze({
  CHAPTER: "Chapter",
  LESSON: "Lesson",
});

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const quizzValidator = {
  create: [
    check("type")
      .notEmpty()
      .withMessage(message.chapter.creationError.missNameChapter)
      .custom((value) => Object.values(typeQuizz).includes(value))
      .withMessage("Invalid type. Must be one of: Chapter, Lesson"),
    handleValidationErrors,
  ],

  find: [
    check("type")
      .notEmpty()
      .withMessage(message.chapter.creationError.missNameChapter)
      .custom((value) => Object.values(typeQuizz).includes(value))
      .withMessage("Invalid type. Must be one of: Chapter, Lesson"),
    handleValidationErrors,
  ],
};

module.exports = quizzValidator;
