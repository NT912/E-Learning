"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _paymentController = require("../controllers/paymentController");
var _authMiddleware = require("../middleware/authMiddleware");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/process", _authMiddleware.verifyToken, _paymentController.processPayment);
router.post("/record", _authMiddleware.verifyToken, _paymentController.recordPayment);
var _default = exports["default"] = router;