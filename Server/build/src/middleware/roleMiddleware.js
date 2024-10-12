"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roleMiddleware = void 0;
var requireRole = function requireRole(role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res.status(403).send("Access denied");
    }
    next();
  };
};
var roleMiddleware = exports.roleMiddleware = {
  requireRole: requireRole
};