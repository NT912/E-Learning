const { check, validationResult } = require("express-validator");
const message = require("../../config/message.json");

const outcomeValidator = {

  update: [
    check("content")
      .notEmpty()
      .withMessage(message.outline.updateError.missDescription), 
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

module.exports = outcomeValidator;
