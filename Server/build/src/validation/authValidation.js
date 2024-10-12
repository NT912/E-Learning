"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSignup = void 0;
var _expressValidator = require("express-validator");
var validateSignup = exports.validateSignup = [(0, _expressValidator.check)("email", "Email is required").isEmail(), (0, _expressValidator.check)("password", "Password is required").isLength({
  min: 6
}), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
}];