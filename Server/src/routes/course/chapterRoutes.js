const express = require("express");
const router = express.Router();

const chapterController = require("../../controllers/course/chapterController");
const authMiddleware = require("../../middleware/authMiddleware");
const chapterValidator = require("../../validation/chapterValidation");
const roleMiddleware = require("../../middleware/roleMiddleware");
const Role = require("../../config/role");


/*
Chapter
*/
/**
 * @swagger
 * /course/chapter/create/{courseID}:
 *   post:
 *     summary: Create a new chapter for a course
 *     tags: [Chapter]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: The ID of the course to add the chapter to
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Chapter created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chapterID:
 *                   type: integer
 *                   description: The ID of the newly created chapter
 *       400:
 *         description: Error creating chapter
 */
router.post("/create/:courseID", roleMiddleware.checkRole(Role.TEACHER), authMiddleware.verifyToken, chapterController.create);
/**
 * @swagger
 * /course/chapter/update/name/{chapterID}:
 *   post:
 *     summary: Update chapter name
 *     tags: [Chapter]
 *     parameters:
 *       - in: path
 *         name: chapterID
 *         required: true
 *         description: The ID of the chapter to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The updated chapter name
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chapterName:
 *                 type: string
 *                 description: The new name for the chapter
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chapter name updated successfully
 *       400:
 *         description: Error updating chapter name
 */
router.post("/:chapterID/update/name", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), chapterValidator.updateName, chapterController.updateChapterName);
/**
 * @swagger
 * /course/chapter/delete/{chapterID}:
 *   post:
 *     summary: Delete a chapter from the course
 *     tags: [Chapter]
 *     parameters:
 *       - in: path
 *         name: chapterID
 *         required: true
 *         description: The ID of the chapter to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chapter deleted successfully
 *       400:
 *         description: Error deleting chapter
 */
router.post("/:chapterID/delete", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), chapterController.deleteChapter);

module.exports = router;
