const { check, validationResult } = require("express-validator");
const response = require("../helpers/sendResponse")
const message = require("../config/message.json");

const courseValidator = {
    updateCourseName: [
      check("courseID", )
        .notEmpty()
        .withMessage(message.course.updateError.description.missCourseID), 
      check("courseName", )
        .notEmpty()
        .withMessage(message.course.updateError.description.missCourseName), 
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

module.exports = courseValidator;
