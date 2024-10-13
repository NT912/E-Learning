"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Payment = void 0;
var _db = require("../config/db");
var Payment = exports.Payment = {
  create: function create(paymentData, callback) {
    var sql = "INSERT INTO Payment (UserID, CourseID, Amount, CreateAt) VALUES (?, ?, ?, ?)";
    _db.db.query(sql, [paymentData.userID, paymentData.courseID, paymentData.amount, new Date()], callback);
  }
};