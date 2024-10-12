"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnrollmentController = void 0;
var _enrollmentService = require("../services/enrollmentService");
var enroll = function enroll(req, res) {
  _enrollmentService.enrollmentService.enroll(req.body, function (err, result) {
    if (err) return res.status(400).send(err);
    res.status(201).send("Enrollment successful");
  });
};
var EnrollmentController = exports.EnrollmentController = {
  enroll: enroll
};