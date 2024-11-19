const express = require("express");
const multer = require("multer");
const authMiddleware = require("../../middleware/authMiddleware");
const lessonController = require("../../controllers/course/lessonController");
const lessonValidator = require("../../validation/course/lessonValidator")

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

/**
 * @swagger
 * /course/lesson/{lessonID}/update:
 *   post:
 *     summary: Update a lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonID
 *         required: true
 *         description: The ID of the lesson to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: The updated lesson details
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 require: true
 *                 description: The new title of the lesson
 *               description:
 *                 type: string
 *                 description: The new description of the lesson
 *               link:
 *                 type: string
 *                 description: An optional external link for the lesson
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Optional file upload for the lesson (e.g., video, PDF, ZIP)
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/:lessonID/update", authMiddleware.techerRequire, upload.single("file"), lessonValidator.updateLesson,  lessonController.updateLesson);

/**
 * @swagger
 * /course/lesson/{lessonID}/update/delete:
 *   delete:
 *     summary: Delete lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonID
 *         required: true
 *         description: The ID of the lesson to update demo access
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson demo access updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Error updating lesson demo access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/:lessonID/delete", authMiddleware.techerRequire, lessonController.delete);

/**
 * @swagger
 * /course/lesson/{lessonID}/update/allowDemo:
 *   patch:
 *     summary: Update lesson to allow demo access
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonID
 *         required: true
 *         description: The ID of the lesson to update demo access
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson demo access updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Error updating lesson demo access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.patch("/:lessonID/update/allowDemo", authMiddleware.techerRequire, lessonController.allowDemo);

// // Lấy chi tiết bài học
// router.get(
//   "/:lessonID",
//   authMiddleware.loginRequire,
//   (req, res) => {
//     // Controller lấy thông tin chi tiết bài học từ course-service.
//   }

module.exports = router;
