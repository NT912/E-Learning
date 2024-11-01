import express, { Request, Response } from "express";
import outcomeController from "../controllers/outcomeController";
import outcomeValidator from "../validation/outcomeValidation";

const router = express.Router();

/**
 * Outcome Routes
 */

/**
 * @swagger
 * /course/outcome/create/{courseID}:
 *   post:
 *     summary: Create a new outcome for a course
 *     tags: [Outcome]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to add the outcome to
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User ID and details to create an outcome
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: The ID of the user creating the outcome
 *     responses:
 *       201:
 *         description: Outcome created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 outComeID:
 *                   type: integer
 *                   description: The ID of the newly created outcome
 *       400:
 *         description: Error creating outcome
 */
router.post(
  "/create/:courseID",
  outcomeValidator.updateOutcome,
  (req: Request, res: Response) => outcomeController.create(req, res)
);

/**
 * @swagger
 * /course/outcome/{outcomeID}/update/name:
 *   post:
 *     summary: Update the name of an outcome
 *     tags: [Outcome]
 *     parameters:
 *       - in: path
 *         name: outcomeID
 *         required: true
 *         description: ID of the outcome to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated name of the outcome
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new name of the outcome
 *               userID:
 *                 type: integer
 *                 description: The ID of the user updating the outcome
 *     responses:
 *       200:
 *         description: Outcome name updated successfully
 *       400:
 *         description: Error updating outcome name
 */
router.post(
  "/:outcomeID/update/name",
  outcomeValidator.createOutcome,
  (req: Request, res: Response) => outcomeController.update(req, res)
);

/**
 * @swagger
 * /course/outcome/{outcomeID}/delete:
 *   delete:
 *     summary: Delete an outcome
 *     tags: [Outcome]
 *     parameters:
 *       - in: path
 *         name: outcomeID
 *         required: true
 *         description: ID of the outcome to delete
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User ID to authorize deletion
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: The ID of the user deleting the outcome
 *     responses:
 *       200:
 *         description: Outcome deleted successfully
 *       400:
 *         description: Error deleting outcome
 */
router.delete(
  "/:outcomeID/delete",
  outcomeValidator.deleteOutCome,
  (req: Request, res: Response) => outcomeController.delete(req, res)
);

export default router;
