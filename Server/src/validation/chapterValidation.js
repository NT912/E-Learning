const { check, validationResult } = require("express-validator");
const message = require("../config/message.json");
const { updateName } = require("../models/course/courseModel");

const chapterValidator = {
  create: [
    check("courseID", )
      .notEmpty()
      .withMessage(message.chapter.creationError.description.missCourseID), 
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(
          res,
          false,
          message.course.creationError.title,
          errors.array().map(err => err.msg).join(", ")
        );
      }
      next();
    },
  ],

  updateName: [
    check("chapterID", )
      .notEmpty()
      .withMessage(message.chapter.creationError.description.missCourseID), 
    check("chapterName", )
      .notEmpty()
      .withMessage(message.chapter.creationError.description.missNameChapter), 
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(
          res,
          false,
          message.course.creationError.title,
          errors.array().map(err => err.msg).join(", ")
        );
      }
      next();
    },
  ],
};

module.exports = chapterValidator;
