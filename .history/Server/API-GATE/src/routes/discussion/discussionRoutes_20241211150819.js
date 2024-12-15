const express = require("express");
const discussionController = require("../../controllers/discussion/discussionController");
const authMiddleware = require("../../middleware/authMiddleware");
const discussionValidation = require("../../validation/discussion/discussionValidation");

const router = express.Router();

/**
 * @swagger
 * /courses/{courseID}/discussions:
 *   post:
 *     summary: Tạo một thảo luận mới cho khóa học
 *     description: Tạo thảo luận với tiêu đề và mô tả cho một khóa học cụ thể.
 *     tags:
 *       - Discussions
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *     responses:
 *       '201':
 *         description: Thảo luận được tạo thành công
 *       '400':
 *         description: Dữ liệu gửi lên không hợp lệ
 *       '401':
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *       '500':
 *         description: Lỗi server
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
 *     summary: Lấy danh sách tất cả thảo luận của khóa học
 *     description: Trả về danh sách tất cả thảo luận của khóa học với ID tương ứng.
 *     tags:
 *       - Discussions
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Danh sách thảo luận của khóa học
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       '401':
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *       '500':
 *         description: Lỗi server
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
 *     summary: Cập nhật một thảo luận
 *     description: Cập nhật thông tin của thảo luận đã tồn tại.
 *     tags:
 *       - Discussions
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         description: ID của thảo luận
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *     responses:
 *       '200':
 *         description: Thảo luận đã được cập nhật thành công
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *       '401':
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *       '404':
 *         description: Thảo luận không tồn tại
 *       '500':
 *         description: Lỗi server
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
 *     summary: Xóa một thảo luận
 *     description: Xóa một thảo luận dựa trên ID.
 *     tags:
 *       - Discussions
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         description: ID của thảo luận cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Thảo luận đã được xóa thành công
 *       '401':
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *       '404':
 *         description: Thảo luận không tồn tại
 *       '500':
 *         description: Lỗi server
 */
router.delete(
  "/discussions/:discussionID",
  authMiddleware.verifyToken,
  discussionController.deleteDiscussion
);

/**
 * @swagger
 * /discussions/{discussionID}/replies:
 *   post:
 *     summary: Tạo một trả lời mới cho thảo luận
 *     description: Tạo một trả lời cho thảo luận với nội dung được cung cấp.
 *     tags:
 *       - Replies
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         description: ID của thảo luận
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             required:
 *               - content
 *     responses:
 *       '201':
 *         description: Trả lời đã được tạo thành công
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *       '401':
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *       '404':
 *         description: Thảo luận không tồn tại
 *       '500':
 *         description: Lỗi server
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
 *     summary: Lấy tất cả các trả lời của thảo luận
 *     description: Trả về danh sách tất cả các trả lời cho một thảo luận cụ thể.
 *     tags:
 *       - Replies
 *     parameters:
 *       - in: path
 *         name: discussionID
 *         required: true
 *         description: ID của thảo luận
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Danh sách trả lời của thảo luận
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       '401':
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *       '500':
 *         description: Lỗi server
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
 *     summary: Cập nhật một trả lời thảo luận
 *     description: Cập nhật nội dung của một trả lời thảo luận đã tồn tại.
 *     tags:
 *       - Replies
 *     parameters:
 *       - in: path
 *         name: replyID
 *         required: true
 *         description: ID của trả lời thảo luận
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             required:
 *               - content
 *     responses:
 *       '200':
 *         description: Trả lời đã được cập nhật thành công
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *       '401':
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *       '404':
 *         description: Trả lời không tồn tại
 *       '500':
 *         description: Lỗi server
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
 *     summary: Xóa một trả lời thảo luận
 *     description: Xóa một trả lời thảo luận dựa trên ID.
 *     tags:
 *       - Replies
 *     parameters:
 *       - in: path
 *         name: replyID
 *         required: true
 *         description: ID của trả lời thảo luận
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Trả lời đã được xóa thành công
 *       '401':
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *       '404':
 *         description: Trả lời không tồn tại
 *       '500':
 *         description: Lỗi server
 */
router.delete(
  "/replies/:replyID",
  authMiddleware.verifyToken,
  discussionController.deleteReply
);

module.exports = router;
