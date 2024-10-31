import express, { Request, Response } from "express";
import multer from "multer";

import lessonController from "../controllers/lessonController";
import lessonValidator from "../validation/lessonValidation";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * Lesson Routes
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
 *     requestBody:
 *       description: The user ID required to create a lesson
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: The ID of the user creating the lesson
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
router.post(
  "/create/:chapterID",
  lessonValidator.create,
  (req: Request, res: Response) => lessonController.create(req, res)
);

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
 *               userID:
 *                 type: integer
 *                 required: true
 *                 description: The ID of the user updating the lesson
 *               title:
 *                 type: string
 *                 required: true
 *                 description: The new title for the lesson
 *               description:
 *                 type: string
 *                 description: The new description for the lesson
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Optional file upload for the lesson (video, PDF, ZIP, Word)
 *               link:
 *                 type: string
 *                 description: Optional link of lesson (youtube video ...)
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       400:
 *         description: Error updating lesson
 */
router.post(
  "/:lessonID/update",
  upload.single("file"),
  lessonValidator.update,
  (req: Request, res: Response) => lessonController.updateLesson(req, res)
);

/**
 * @swagger
 * /course/lesson/{lessonID}/delete:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonID
 *         required: true
 *         description: The ID of the lesson to delete
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The user ID required to delete the lesson
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: The ID of the user requesting the delete
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       400:
 *         description: Error deleting lesson
 */
router.delete(
  "/:lessonID/delete",
  lessonValidator.deleteALesson,
  (req: Request, res: Response) => lessonController.delete(req, res)
);

/**
 * @swagger
 * /course/lesson/{lessonID}/update/allowDemo:
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
 *     requestBody:
 *       description: The user ID required to update demo access
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: The ID of the user updating demo access
 *     responses:
 *       200:
 *         description: Lesson demo access updated successfully
 *       400:
 *         description: Error updating lesson demo access
 */
router.post(
  "/:lessonID/update/allowDemo",
  lessonValidator.updateLessonAllowDemo,
  (req: Request, res: Response) => lessonController.updateLessonAllowDemo(req, res)
);

/**
 * @swagger
 * /course/lesson/{lessonID}:
 *   get:
 *     summary: Get detailed information of a lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonID
 *         required: true
 *         description: The ID of the lesson to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson details retrieved successfully
 *       400:
 *         description: Error retrieving lesson details
 *       404:
 *         description: Lesson not found
 */
router.get(
  "/:lessonID",
  lessonValidator.getLessonById,
  (req: Request, res: Response) => lessonController.getALesson(req, res)
);

export default router;
