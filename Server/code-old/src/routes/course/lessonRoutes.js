const express = require("express");
const router = express.Router();
const multer = require("multer");

const lessonController = require("../../controllers/course/lessonController");
const authMiddleware = require("../../middleware/authMiddleware");
const lessonValidator = require("../../validation/lessonValidation");

const roleMiddleware = require("../../middleware/roleMiddleware");
const Role = require("../../../config/data/role");

const upload = multer({ dest: 'uploads/' });

/*
Lesson
*/
/**
 * @swagger
 * /course/lesson/create/{chapterID}:
 *   post:
 *     summary: Create a new lesson in a chapter
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: chapterID
 *         required: true
 *         description: The ID of the chapter to add the lesson to
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
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
 *       400:
 *         description: Error creating lesson
 */
router.post("/create/:chapterID", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), lessonController.create);
/**
 * @swagger
 * /course/lesson/{lessonID}/update:
 *   post:
 *     summary: Update lesson details
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonID
 *         required: true
 *         description: The ID of the lesson to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The updated lesson details, including file upload if necessary
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The new title for the lesson
 *               description:
 *                 type: string
 *                 description: The new description for the lesson
 *               file:
 *                 type: string
 *                 required: true
 *                 format: binary
 *                 description: An optional file to upload for the lesson (video, pdf, zip, word)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       400:
 *         description: Error updating lesson
 */
router.post("/:lessonID/update", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), upload.single('file'), lessonValidator.update, lessonController.updateLesson);
/**
 * @swagger
 * /course/lesson/{lessonID}/delete:
 *   post:
 *     summary: Delete a lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonID
 *         required: true
 *         description: The ID of the lesson to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       400:
 *         description: Error deleting lesson
 */
router.post("/:lessonID/delete", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), lessonController.delete);
/**
 * @swagger
 * /lesson/{lessonID}/update/allowDemo:
 *   post:
 *     summary: Update lesson to allow demo access
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonID
 *         required: true
 *         description: The ID of the lesson to update demo access
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson demo access updated successfully
 *       400:
 *         description: Error updating lesson demo access
 */
router.post("/:lessonID/update/allowDemo", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), lessonController.updateLessonAllowDemo);

module.exports = router;
