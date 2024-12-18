// src/routes/progressRoutes.ts
import express from "express";
import progressController from "../controllers/progressController";

const router = express.Router();

/**
 * @swagger
 * /progress/{enrollmentID}/lesson/{lessonID}:
 *   patch:
 *     summary: Update progress for a lesson in a course
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: enrollmentID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enrollment
 *       - in: path
 *         name: lessonID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the lesson
 *     requestBody:
 *       description: Progress details such as ProgressTime and IsCompleted
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               progressTime:
 *                 type: integer
 *                 description: Time spent in the lesson
 *               isCompleted:
 *                 type: boolean
 *                 description: Lesson completion status
 *               attempts:
 *                 type: integer
 *                 description: Number of attempts
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *       400:
 *         description: Error updating progress
 */
router.patch("/:enrollmentID/lesson/:lessonID", progressController.updateProgress);

/**
 * @swagger
 * /progress/{enrollmentID}/lesson/{lessonID}:
 *   post:
 *     summary: Add new progress record for a lesson in a course
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: enrollmentID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enrollment
 *       - in: path
 *         name: lessonID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the lesson
 *     requestBody:
 *       description: Initial progress details for the new lesson
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               progressTime:
 *                 type: integer
 *                 description: Initial time spent in the lesson
 *               attempts:
 *                 type: integer
 *                 description: Number of attempts at the start (default 0)
 *     responses:
 *       201:
 *         description: New progress record created successfully
 *       400:
 *         description: Error creating new progress record
 */
router.post("/:enrollmentID/lesson/:lessonID", progressController.addProgress);

export default router;
