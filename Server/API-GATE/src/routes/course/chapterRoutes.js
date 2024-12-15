const express = require("express");

const chapterController = require("../../controllers/course/chapterController");
const authMiddleware = require("../../middleware/authMiddleware");
const chapterValidator = require("../../validation/course/chapterValidator");

const router = express.Router();

/**
 * @swagger
 * /course/chapter/create/{courseID}:
 *   post:
 *     summary: Create a new chapter for a course
 *     tags: [Chapter]
 *     security:
 *       - bearerAuth: []
 *     description: Endpoint to create a new chapter for a course. Requires a valid teacher token.
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course to which the chapter will be added
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
 *                   description: ID of the newly created chapter
 *                   example: 1
 *       400:
 *         description: Error in creating chapter
 */
router.post("/create/:courseID", authMiddleware.techerRequire, chapterController.createChapter);   

/**
 * @swagger
 * /course/chapter/{chapterID}/update:
 *   patch:
 *     summary: Update an existing chapter of a course
 *     tags: [Chapter]
 *     security:
 *       - bearerAuth: []
 *     description: Endpoint to update details of an existing chapter. Requires a valid teacher token.
 *     parameters:
 *       - in: path
 *         name: chapterID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the chapter to update
 *     requestBody:
 *       description: Updated chapter information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the chapter
 *                 example: "Advanced Topics in Data Science"
 *               description:
 *                 type: string
 *                 description: Updated description of the chapter
 *                 example: "This chapter covers advanced topics in data science, including ML models..."
 *     responses:
 *       200:
 *         description: Chapter updated successfully
 *       400:
 *         description: Error in updating chapter
 */
router.patch("/:chapterID/update", authMiddleware.techerRequire, chapterValidator.update, chapterController.updateChapter);

/**
 * @swagger
 * /course/chapter/{chapterID}/delete:
 *   delete:
 *     summary: Delete a chapter from the course
 *     tags: [Chapter]
 *     parameters:
 *       - in: path
 *         name: chapterID
 *         required: true
 *         description: The ID of the chapter to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chapter deleted successfully
 *       400:
 *         description: Error deleting chapter
 */
router.delete("/:chapterID/delete", authMiddleware.techerRequire, chapterController.deleteChapter);

/**
 * @swagger
 * /course/chapter/{chapterID}:
 *   get:
 *     summary: Get a single chapter by its ID
 *     tags: [Chapter]
 *     parameters:
 *       - in: path
 *         name: chapterID
 *         required: true
 *         description: ID of the chapter to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chapter retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chapterID:
 *                   type: integer
 *                   description: ID of the chapter
 *       400:
 *         description: Error retrieving chapter
 */
router.get("/:chapterID", chapterController.getChapter);

/**
 * @swagger
 * /course/chapter/all/{courseID}:
 *   get:
 *     summary: Get all chapters for a specific course
 *     tags: [Chapter]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to retrieve chapters from
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chapters retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   chapterID:
 *                     type: integer
 *                     description: ID of the chapter
 *       400:
 *         description: Error retrieving chapters
 */
router.get("/all/:courseID", (req, res) => chapterController.getChapters);
module.exports = router;
