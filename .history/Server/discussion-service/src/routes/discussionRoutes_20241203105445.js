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
 * /discussions/{discussionID}:
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
 *     description: Adds a reply to a specific discussion. Requires user authentication.
 *     tags:
 *       - Discussions
 *     security:
 *       - bearerAuth: []  # Requires JWT token in Authorization header
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the discussion to add a reply to
 *     requestBody:
 *       description: Content of the reply
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The reply content
 *                 example: "This is a response to the discussion."
 *     responses:
 *       201:
 *         description: Reply created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 title:
 *                   type: string
 *                   example: "Reply Created"
 *                 description:
 *                   type: string
 *                   example: "The reply has been added successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     replyID:
 *                       type: integer
 *                       example: 123
 *                     content:
 *                       type: string
 *                       example: "This is a response to the discussion."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-04T10:30:00Z"
 *       400:
 *         description: Invalid or missing reply content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Invalid Content"
 *                 description:
 *                   type: string
 *                   example: "Reply content cannot be empty."
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Token Error"
 *                 description:
 *                   type: string
 *                   example: "Authorization token is required."
 *       404:
 *         description: Discussion not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Not Found"
 *                 description:
 *                   type: string
 *                   example: "Discussion with the specified ID not found."
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
 *     summary: Get replies for a discussion
 *     description: Retrieves a list of replies associated with a specific discussion. Requires user authentication.
 *     tags:
 *       - Discussions
 *     security:
 *       - bearerAuth: []  # Requires JWT token in Authorization header
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the discussion to retrieve replies for
 *     responses:
 *       200:
 *         description: Successfully retrieved replies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 title:
 *                   type: string
 *                   example: "Replies Retrieved"
 *                 description:
 *                   type: string
 *                   example: "Successfully retrieved replies for the discussion."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       replyID:
 *                         type: integer
 *                         example: 123
 *                       content:
 *                         type: string
 *                         example: "This is a response to the discussion."
 *                       userID:
 *                         type: integer
 *                         example: 456
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-04T10:30:00Z"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Token Error"
 *                 description:
 *                   type: string
 *                   example: "Authorization token is required."
 *       404:
 *         description: Discussion not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Not Found"
 *                 description:
 *                   type: string
 *                   example: "Discussion with the specified ID not found."
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
 *     summary: Update a reply in a discussion
 *     description: Allows authenticated users to update their reply content in a discussion.
 *     tags:
 *       - Discussions
 *     security:
 *       - bearerAuth: []  # Requires JWT token in Authorization header
 *     parameters:
 *       - in: path
 *         name: replyID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the reply to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: New content for the reply
 *                 example: "This is the updated content of the reply."
 *     responses:
 *       200:
 *         description: Reply updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 title:
 *                   type: string
 *                   example: "Reply Updated"
 *                 description:
 *                   type: string
 *                   example: "The reply has been successfully updated."
 *       400:
 *         description: Validation error for the input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Validation Error"
 *                 description:
 *                   type: string
 *                   example: "Reply content cannot be empty."
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Token Error"
 *                 description:
 *                   type: string
 *                   example: "Authorization token is required."
 *       404:
 *         description: Reply not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Not Found"
 *                 description:
 *                   type: string
 *                   example: "Reply with the specified ID not found."
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
 *     summary: Delete a reply in a discussion
 *     description: Allows authenticated users to delete their reply in a discussion.
 *     tags:
 *       - Discussions
 *     security:
 *       - bearerAuth: []  # Requires JWT token in Authorization header
 *     parameters:
 *       - in: path
 *         name: replyID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the reply to delete
 *     responses:
 *       200:
 *         description: Reply deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 title:
 *                   type: string
 *                   example: "Reply Deleted"
 *                 description:
 *                   type: string
 *                   example: "The reply has been successfully deleted."
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Token Error"
 *                 description:
 *                   type: string
 *                   example: "Authorization token is required."
 *       403:
 *         description: Forbidden - User does not have permission to delete this reply
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Permission Denied"
 *                 description:
 *                   type: string
 *                   example: "You do not have permission to delete this reply."
 *       404:
 *         description: Reply not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 title:
 *                   type: string
 *                   example: "Not Found"
 *                 description:
 *                   type: string
 *                   example: "Reply with the specified ID not found."
 */
router.delete(
  "/replies/:replyID",
  authMiddleware.verifyToken,
  discussionController.deleteReply
);

module.exports = router;
