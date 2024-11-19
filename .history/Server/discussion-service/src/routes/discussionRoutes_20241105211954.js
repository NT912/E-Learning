const express = require("express");
const discussionController = require("../controllers/discussionController");
const authMiddleware = require("../middleware/authMiddleware");
const discussionValidation = require("../validation/discussionValidation");

const router = express.Router();

// Routes for discussion

/**
 * @swagger
 * /courses/{courseID}/discussions:
 *   post:
 *     summary: Create a new discussion in a course
 *     description: Allows authenticated users to create a discussion in a specific course.
 *     tags:
 *       - Discussions
 *     security:
 *       - bearerAuth: []  # Requires JWT token in Authorization header
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course where the discussion will be created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the discussion
 *                 example: "Discussion on Chapter 1"
 *               content:
 *                 type: string
 *                 description: The main content of the discussion
 *                 example: "I have some questions about the concepts covered in Chapter 1."
 *     responses:
 *       201:
 *         description: Discussion created successfully
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
 *                   example: "Discussion Created"
 *                 description:
 *                   type: string
 *                   example: "Your discussion has been successfully created."
 *                 data:
 *                   type: object
 *                   properties:
 *                     discussionID:
 *                       type: integer
 *                       description: ID of the newly created discussion
 *                       example: 123
 *       400:
 *         description: Invalid input or missing fields
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
 *                   example: "Input data validation failed. Please check your input and try again."
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
 *         description: Forbidden - Insufficient permissions
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
 *                   example: "Access Denied"
 *                 description:
 *                   type: string
 *                   example: "You do not have permission to perform this action."
 */
router.post(
  "/courses/:courseID/discussions",
  authMiddleware.verifyToken,
  discussionValidation.validateDiscussionContent,
  discussionController.createDiscussion
);

/**
 * @swagger
 * /courses/{courseID}/discussions:
 *   get:
 *     summary: Get discussions in a course
 *     description: Fetches a list of discussions for a specific course. Requires user authentication.
 *     tags:
 *       - Discussions
 *     security:
 *       - bearerAuth: []  # Requires JWT token in Authorization header
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course to retrieve discussions for
 *     responses:
 *       200:
 *         description: List of discussions retrieved successfully
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
 *                   example: "Discussions Retrieved"
 *                 description:
 *                   type: string
 *                   example: "Successfully retrieved discussions for the course."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       discussionID:
 *                         type: integer
 *                         description: ID of the discussion
 *                         example: 123
 *                       title:
 *                         type: string
 *                         description: Title of the discussion
 *                         example: "Discussion on Chapter 1"
 *                       content:
 *                         type: string
 *                         description: Main content of the discussion
 *                         example: "I have some questions about the concepts covered in Chapter 1."
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the discussion was created
 *                         example: "2024-10-22T15:23:00.000Z"
 *                       createdBy:
 *                         type: object
 *                         properties:
 *                           userID:
 *                             type: integer
 *                             description: ID of the user who created the discussion
 *                             example: 5
 *                           username:
 *                             type: string
 *                             description: Username of the discussion creator
 *                             example: "johndoe"
 *       400:
 *         description: Invalid course ID
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
 *                   example: "Invalid Input"
 *                 description:
 *                   type: string
 *                   example: "The provided course ID is invalid."
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
 *         description: Forbidden - Insufficient permissions
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
 *                   example: "Access Denied"
 *                 description:
 *                   type: string
 *                   example: "You do not have permission to perform this action."
 */
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
