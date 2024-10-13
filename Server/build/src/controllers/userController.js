"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;
var _User = require("../models/User");
var getUserProfile = function getUserProfile(req, res) {
  if (!req.user || !req.user.id) {
    return res.status(400).send("User not authenticated");
  }
  var userId = req.user.id;
  _User.User.findById(userId, function (err, user) {
    if (err) return res.status(500).send("Error fetching user profile");
    res.status(200).json(user);
  });
};
var userController = exports.userController = {
  getUserProfile: getUserProfile
};