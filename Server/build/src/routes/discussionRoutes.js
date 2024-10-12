"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _discussionController = require("../controllers/discussionController");
var _authMiddleware = require("../middleware/authMiddleware");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/create", _authMiddleware.verifyToken, _discussionController.createDiscussion);
router.get("/course/:courseID", _authMiddleware.verifyToken, _discussionController.getDiscussionsByCourse);
var _default = exports["default"] = router;