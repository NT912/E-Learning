"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseController = void 0;
var _courseService = require("../services/courseService");
var createCourse = function createCourse(req, res) {
  _courseService.courseService.createCourse(req.body, function (err, result) {
    if (err) return res.status(400).send(err);
    res.status(201).send(result);
  });
};
var getCourses = function getCourses(req, res) {
  _courseService.courseService.getCourses(function (err, courses) {
    if (err) return res.status(500).send("Error fetching courses");
    res.status(200).json(courses);
  });
};
var courseController = exports.courseController = {
  createCourse: createCourse,
  getCourses: getCourses
};