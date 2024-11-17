import express, { Request, Response } from "express";
import chapterController from "../controllers/chapterController";
import chapterValidator from "../validation/chapterValidation";

const router = express.Router();

/**
 * @swagger
 * /course/chapter/create:
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
 *     requestBody:
 *       description: Information to create a new chapter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseID:
 *                 type: integer
 *                 description: Course that chapter belong to
 *               userID:
 *                 type: integer
 *                 description: ID of the user creating the chapter
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
 *       400:
 *         description: Error creating chapter
 */
router.post("/create", (req: Request, res: Response) => chapterController.create(req, res));

/**
 * @swagger
 * /course/chapter/{chapterID}/update/name:
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
 *       description: The updated name for the chapter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user updating the chapter
 *               chapterName:
 *                 type: string
 *                 description: The new name for the chapter
 *               description:
 *                 type: string
 *                 description: The description for the chapter
 *     responses:
 *       200:
 *         description: Chapter name updated successfully
 *       400:
 *         description: Error updating chapter name
 */
router.post("/:chapterID/update", (req: Request, res: Response) => chapterController.updateChapterName(req, res));

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
 *     requestBody:
 *       description: User ID required to delete the chapter
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user requesting the delete
 *     responses:
 *       200:
 *         description: Chapter deleted successfully
 *       400:
 *         description: Error deleting chapter
 */
router.delete("/:chapterID/delete", (req: Request, res: Response) => chapterController.deleteChapter(req, res));

export default router;
