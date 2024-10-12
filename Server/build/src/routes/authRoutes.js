"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/authController");
var _authValidation = require("../validation/authValidation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/signup", _authValidation.validateSignup, _authController.signup);
router.post("/login", _authController.login);
var _default = exports["default"] = router;