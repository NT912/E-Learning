const { check, validationResult } = require("express-validator");
const sendResponse = require("../helpers/sendResponse");
const messages = require("../config/message.json");

exports.validateSignup = [
  check("email")
    .notEmpty()
    .withMessage(messages.auth.signupError.description.emptyEmail)
    .isEmail()
    .withMessage(messages.auth.signupError.description.invalidEmail),

  check("password")
    .notEmpty()
    .withMessage(messages.auth.signupError.description.emptyPassword)
    .isLength({ min: 6 })
    .withMessage(messages.auth.signupError.description.passwordTooShort),

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
        messages.auth.signupError.title,
        errorDescriptions
      );
    }
    next();
  },
];

exports.validateLogin = [
  check("email")
    .notEmpty()
    .withMessage(messages.auth.loginError.description.emptyEmail)
    .isEmail()
    .withMessage(messages.auth.loginError.description.invalidEmail),

  check("password")
    .notEmpty()
    .withMessage(messages.auth.loginError.description.emptyPassword)
    .isLength({ min: 6 })
    .withMessage(messages.auth.signupError.description.passwordTooShort),

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
        messages.auth.loginError.title,
        errorDescriptions
      );
    }
    next();
  },
];
