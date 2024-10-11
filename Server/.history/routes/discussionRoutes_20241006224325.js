const express = require("express");
const {
  createDiscussion,
  getDiscussionsByCourse,
} = require("../controllers/discussionController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", verifyToken, createDiscussion);
router.get("/course/:courseID", verifyToken, getDiscussionsByCourse);

module.exports = router;
