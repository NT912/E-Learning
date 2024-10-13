"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recordPayment = exports.processPayment = void 0;
var _stripe = _interopRequireDefault(require("stripe"));
var _Payment = require("../models/Payment");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var processPayment = exports.processPayment = function processPayment(req, res) {
  var _req$body = req.body,
    amount = _req$body.amount,
    currency = _req$body.currency,
    description = _req$body.description;
  _stripe["default"].paymentIntents.create({
    amount: amount,
    currency: currency,
    payment_method_types: ["card"],
    description: description
  }, function (err, paymentIntent) {
    if (err) return res.status(500).send("Payment error");
    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  });
};
var recordPayment = exports.recordPayment = function recordPayment(req, res) {
  var _req$body2 = req.body,
    userID = _req$body2.userID,
    courseID = _req$body2.courseID,
    amount = _req$body2.amount;
  _Payment.Payment.create({
    userID: userID,
    courseID: courseID,
    amount: amount,
    date: new Date()
  }, function (err, result) {
    if (err) return res.status(400).send("Error recording payment");
    res.status(201).send("Payment recorded");
  });
};