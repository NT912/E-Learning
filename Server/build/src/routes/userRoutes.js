"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
var _authMiddleware = require("../middleware/authMiddleware");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get("/profile", _authMiddleware.verifyToken, _userController.userController.getUserProfile);
var _default = exports["default"] = router;