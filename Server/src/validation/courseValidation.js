const { check, validationResult } = require("express-validator");
const message = require("../config/message.json")

const courseValidator = {
    createCourse: [
        check("userID", )
          .notEmpty()
          .withMessage(message.course.creationError.description.noUserID), 
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({
              success: false,
              title: message.course.creationError.title,
              description: errors.array().map(err => err.msg).join(", ")
            });
          }
          next();
        },
    ],

  validateLogin: [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

// Export the validator for use in other modules
module.exports = courseValidator;
