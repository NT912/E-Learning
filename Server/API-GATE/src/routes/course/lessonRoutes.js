const express = require("express");
const multer = require("multer");
const authMiddleware = require("../../middleware/authMiddleware");
const lessonController = require("../../controllers/course/lessonController")

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * /course/lesson/create/{chapterID}:
 *   post:
 *     summary: Create a new lesson in a chapter
 *     tags: [Lesson]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chapterID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the chapter where the lesson will be added
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lessonID:
 *                   type: integer
 *                   description: The ID of the newly created lesson
 *                   example: 1
 *       400:
 *         description: Error creating lesson
 */
router.post("/create/:chapterID", authMiddleware.techerRequire, lessonController.createLesson);

router.post("/:lessonID/update", authMiddleware.techerRequire, upload.single("file"), lessonController.updateLesson);

// // Xóa bài học
// router.delete(
//   "/:lessonID/delete",
//   authMiddleware.teacherRequire,
//   (req, res) => {
//     // Controller gọi API xóa bài học của course-service.
//   }
// );

// // Cập nhật quyền demo của bài học
// router.post(
//   "/:lessonID/update/allowDemo",
//   authMiddleware.teacherRequire,
//   (req, res) => {
//     // Controller cập nhật quyền demo của bài học.
//   }
// );

// // Lấy chi tiết bài học
// router.get(
//   "/:lessonID",
//   authMiddleware.loginRequire,
//   (req, res) => {
//     // Controller lấy thông tin chi tiết bài học từ course-service.
//   }

module.exports = router;
