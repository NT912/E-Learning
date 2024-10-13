"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _courseController = require("../controllers/courseController");
var _authMiddleware = require("../middleware/authMiddleware");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/create", _courseController.courseController.createCourse);
router.post("/update/title", _courseController.courseController.createCourse);

// Export trực tiếp router
var _default = exports["default"] = router;