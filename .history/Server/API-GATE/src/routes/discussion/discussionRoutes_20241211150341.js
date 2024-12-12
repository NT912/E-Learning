const express = require("express");
const discussionController = require("../../controllers/discussion/discussionController");
const authMiddleware = require("../middleware/authMiddleware");
const discussionValidation = require("../validation/discussionValidation");

const router = express.Router();

// Routes cho discussion

/**
 * Tạo một thảo luận mới
 */
router.post(
  "/courses/:courseID/discussions",
  authMiddleware.verifyToken, // Xác thực người dùng
  discussionValidation.validateDiscussionContent, // Xác thực nội dung thảo luận
  discussionController.createDiscussion // Controller xử lý tạo thảo luận
);

/**
 * Lấy tất cả các thảo luận của khóa học
 */
router.get(
  "/courses/:courseID/discussions",
  authMiddleware.verifyToken, // Xác thực người dùng
  discussionController.getDiscussions // Controller xử lý lấy danh sách thảo luận
);

/**
 * Cập nhật thảo luận
 */
router.put(
  "/discussions/:discussionID",
  authMiddleware.verifyToken, // Xác thực người dùng
  discussionValidation.validateDiscussionContent, // Xác thực nội dung thảo luận
  discussionController.updateDiscussion // Controller xử lý cập nhật thảo luận
);

/**
 * Xóa thảo luận
 */
router.delete(
  "/discussions/:discussionID",
  authMiddleware.verifyToken, // Xác thực người dùng
  discussionController.deleteDiscussion // Controller xử lý xóa thảo luận
);

// Routes cho trả lời thảo luận

/**
 * Tạo một trả lời cho thảo luận
 */
router.post(
  "/discussions/:discussionID/replies",
  authMiddleware.verifyToken, // Xác thực người dùng
  discussionValidation.validateReplyContent, // Xác thực nội dung trả lời
  discussionController.createReply // Controller xử lý tạo trả lời
);

/**
 * Lấy tất cả các trả lời của thảo luận
 */
router.get(
  "/discussions/:discussionID/replies",
  authMiddleware.verifyToken, // Xác thực người dùng
  discussionController.getReplies // Controller xử lý lấy danh sách trả lời
);

/**
 * Cập nhật trả lời thảo luận
 */
router.put(
  "/replies/:replyID",
  authMiddleware.verifyToken, // Xác thực người dùng
  discussionValidation.validateReplyContent, // Xác thực nội dung trả lời
  discussionController.updateReply // Controller xử lý cập nhật trả lời
);

/**
 * Xóa trả lời thảo luận
 */
router.delete(
  "/replies/:replyID",
  authMiddleware.verifyToken, // Xác thực người dùng
  discussionController.deleteReply // Controller xử lý xóa trả lời
);

module.exports = router;
