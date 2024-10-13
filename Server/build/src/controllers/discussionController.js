"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDiscussionsByCourse = exports.createDiscussion = void 0;
var _Discussion = require("../models/Discussion");
var createDiscussion = exports.createDiscussion = function createDiscussion(req, res) {
  var _req$body = req.body,
    content = _req$body.content,
    userID = _req$body.userID,
    videoID = _req$body.videoID,
    courseID = _req$body.courseID;
  _Discussion.Discussion.create({
    content: content,
    userID: userID,
    videoID: videoID,
    courseID: courseID
  }, function (err, result) {
    if (err) return res.status(400).send("Error creating discussion");
    res.status(201).send("Discussion created");
  });
};
var getDiscussionsByCourse = exports.getDiscussionsByCourse = function getDiscussionsByCourse(req, res) {
  var courseID = req.params.courseID;
  _Discussion.Discussion.getByCourseID(courseID, function (err, discussions) {
    if (err) return res.status(500).send("Error fetching discussions");
    res.status(200).json(discussions);
  });
};