const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getAllDiscussions,
  createDiscussion,
  getDiscussionById,
} = require("../controllers/discussionController");

// Route để lấy tất cả các bài thảo luận
router.get("/", authMiddleware, getAllDiscussions);

// Route để tạo bài thảo luận mới
router.post("/", authMiddleware, createDiscussion);

// Route để lấy chi tiết bài thảo luận theo ID
router.get("/:id", authMiddleware, getDiscussionById);

module.exports = router;
