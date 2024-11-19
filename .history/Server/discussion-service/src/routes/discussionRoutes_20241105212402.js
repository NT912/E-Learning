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

/**
 * @swagger
 * /discussions/{discussionID}:
 *   put:
 *     summary: Update discussion content
 *     description: Updates the content of a specific discussion. Requires user authentication and valid discussion content.
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
 *         description: ID of the discussion to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated content of the discussion
 *                 example: "This is the updated content for the discussion."
 *     responses:
 *       200:
 *         description: Discussion updated successfully
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
 *                   example: "Discussion Updated"
 *                 description:
 *                   type: string
 *                   example: "The discussion content has been updated successfully."
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
 *                   example: "Invalid Input"
 *                 description:
 *                   type: string
 *                   example: "Content is required for updating discussion."
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
 *         description: Forbidden - Insufficient permissions to update the discussion
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
 *                   example: "You do not have permission to update this discussion."
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
 *     description: Deletes a specific discussion by its ID. Requires user authentication.
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
 *         description: ID of the discussion to be deleted
 *     responses:
 *       200:
 *         description: Discussion deleted successfully
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
 *                   example: "Discussion Deleted"
 *                 description:
 *                   type: string
 *                   example: "The discussion has been deleted successfully."
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
 *         description: Forbidden - Insufficient permissions to delete the discussion
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
 *                   example: "You do not have permission to delete this discussion."
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

router.delete(
  "/replies/:replyID",
  authMiddleware.verifyToken,
  discussionController.deleteReply
);

module.exports = router;