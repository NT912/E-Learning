const express = require("express");
const discussionController = require("../controllers/discussionController");
const authMiddleware = require("../middleware/authMiddleware");
const discussionValidation = require("../validation/discussionValidation");

const router = express.Router();

// Routes for discussion
/**
 * @swagger
 * /discussions/courses/{courseID}/discussions:
 *   post:
 *     summary: Create a new discussion in a course
 *     description: Create a new discussion under the specified course.
 *     tags:
 *       - Discussions
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: The ID of the course to create a discussion in.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Discussion content to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Discussion on Chapter 1"
 *               content:
 *                 type: string
 *                 example: "I have some questions about the concepts covered in Chapter 1."
 *     responses:
 *       200:
 *         description: Successfully created the discussion
 *       400:
 *         description: Bad request due to invalid input
 *       401:
 *         description: Unauthorized if no token is provided or token is invalid
 *       500:
 *         description: Internal server error
 */
router.post(
  "/courses/:courseID/discussions",
  authMiddleware.verifyToken,
  discussionValidation.validateDiscussionContent,
  discussionController.createDiscussion
);

/**
 * @swagger
 * /discussions/courses/{courseID}/discussions:
 *   get:
 *     summary: Get all discussions for a specific course
 *     description: Retrieve all discussions related to a specific course.
 *     tags:
 *       - Discussions
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: The ID of the course to fetch discussions for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved discussions
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/courses/:courseID/discussions",
  authMiddleware.verifyToken,
  discussionController.getDiscussions
);

/**
 * @swagger
 * /discussions/discussions/{discussionID}:
 *   put:
 *     summary: Update an existing discussion
 *     description: Update the content of an existing discussion.
 *     tags:
 *       - Discussions
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         description: The ID of the discussion to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The updated content of the discussion
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the discussion
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Discussion not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/discussions/:discussionID",
  authMiddleware.verifyToken,
  discussionValidation.validateDiscussionContent,
  discussionController.updateDiscussion
);

/**
 * @swagger
 * /discussions/{discussionID}:
 *   delete:
 *     summary: Delete a discussion
 *     description: Delete a specific discussion by its ID.
 *     tags:
 *       - Discussions
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         description: The ID of the discussion to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the discussion
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Discussion not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/discussions/:discussionID",
  authMiddleware.verifyToken,
  discussionController.deleteDiscussion
);

// Routes for discussion replies
/**
 * @swagger
 * /discussions/{discussionID}/replies:
 *   post:
 *     summary: Create a reply to a discussion
 *     description: Add a reply to an existing discussion.
 *     tags:
 *       - Replies
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         description: The ID of the discussion to add a reply to.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The reply content
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This is my reply to the discussion."
 *     responses:
 *       200:
 *         description: Successfully created the reply
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/discussions/:discussionID/replies",
  authMiddleware.verifyToken,
  discussionValidation.validateReplyContent,
  discussionController.createReply
);

/**
 * @swagger
 * /discussions/{discussionID}/replies:
 *   get:
 *     summary: Get all replies to a discussion
 *     description: Retrieve all replies for a specific discussion.
 *     tags:
 *       - Replies
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         description: The ID of the discussion to get replies for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved replies
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/discussions/:discussionID/replies",
  authMiddleware.verifyToken,
  discussionController.getReplies
);

/**
 * @swagger
 * /replies/{replyID}:
 *   put:
 *     summary: Update a reply to a discussion
 *     description: Modify an existing reply to a discussion.
 *     tags:
 *       - Replies
 *     parameters:
 *       - in: path
 *         name: replyID
 *         required: true
 *         description: The ID of the reply to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The updated content of the reply
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the reply
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reply not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/replies/:replyID",
  authMiddleware.verifyToken,
  discussionValidation.validateReplyContent,
  discussionController.updateReply
);

/**
 * @swagger
 * /replies/{replyID}:
 *   delete:
 *     summary: Delete a reply to a discussion
 *     tags: [Replies]
 *     parameters:
 *       - name: replyID
 *         in: path
 *         required: true
 *         description: The ID of the reply to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reply deleted successfully
 *       404:
 *         description: Reply not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/replies/:replyID",
  authMiddleware.verifyToken,
  discussionController.deleteReply
);

module.exports = router;
