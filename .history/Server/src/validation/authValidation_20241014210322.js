const { check, validationResult } = require("express-validator");

exports.validateSignup = [
  if (check("email", "Email is required").isEmail()) {

  },
  check("password", "Password is required").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
