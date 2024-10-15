const { check, validationResult } = require("express-validator");
const sendResponse = require("../helpers/sendResponse");
const messages = require("../config/message.json");

xports.validateSignup = [
  check("email", messages.auth.signup.title)
    .isEmail()
    .withMessage("Email is required"),
  check("password", messages.auth.signup.title)
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorDescriptions = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return sendResponse(
        res,
        false,
        messages.auth.signup.title,
        errorDescriptions
      );
    }
    next();
  },
];

exports.validateLogin = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
