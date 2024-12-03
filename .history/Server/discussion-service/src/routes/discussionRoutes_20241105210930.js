const express = require("express");
const discussionController = require("../controllers/discussionController");
const authMiddleware = require("../middleware/authMiddleware");
const discussionValidation = require("../validation/discussionValidation");

const router = express.Router();

// Routes for course discussion
router.post(
  "/courses/:courseID/discussions",
  authMiddleware.verifyToken,
  discussionValidation.validateDiscussionContent,
  discussionController.createDiscussion
);

router.get(
  "/courses/:courseID/discussions",
  authMiddleware.verifyToken,
  discussionController.getDiscussions
);

router.put(
  "/discussions/:discussionID",
  authMiddleware.verifyToken,
  discussionValidation.validateDiscussionContent,
  discussionController.updateDiscussion
);

router.delete(
  "/discussions/:discussionID",
  authMiddleware.verifyToken,
  discussionController.deleteDiscussion
);

// Routes for discussion replies
router.post(
  "/discussions/:discussionID/replies",
  authMiddleware.verifyToken,
  discussionValidation.validateReplyContent,
  discussionController.createReply
);

router.get(
  "/discussions/:discussionID/replies",
  authMiddleware.verifyToken,
  discussionController.getReplies
);

router.put(
  "/replies/:replyID",
  authMiddleware.verifyToken,
  discussionValidation.validateReplyContent,
  discussionController.updateReply
);

router.delete(
  "/replies/:replyID",
  authMiddleware.verifyToken,
  discussionController.deleteReply
);

module.exports = router;
