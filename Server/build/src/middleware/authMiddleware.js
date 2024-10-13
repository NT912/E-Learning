"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var verifyToken = exports.verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.authorization;
  if (!token) return res.status(403).send("Token required");
  _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded;
    next();
  });
};