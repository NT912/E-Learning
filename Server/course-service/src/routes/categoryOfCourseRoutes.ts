import express, { Request, Response } from "express";
import categoryOfCourseController from "../controllers/categoryOfCourseController";

const router = express.Router();

/*
CategoryOfCourse Routes
*/

/**
 * @swagger
 * /course/{courseID}/add-categories:
 *   post:
 *     summary: Add categories to a course
 *     tags: [CategoryOfCourse]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User ID and list of category IDs to add to the course
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user making the request
 *               categoryIDs:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of category IDs
 *     responses:
 *       201:
 *         description: Categories added successfully to the course
 *       400:
 *         description: Error adding categories
 */
router.post("/:courseID/add-categories", (req: Request, res: Response) => categoryOfCourseController.addCategoriesToCourse(req, res));

/**
 * @swagger
 * /course/{courseID}/remove-category/{categoryID}:
 *   post:
 *     summary: Remove a category from a course
 *     tags: [CategoryOfCourse]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *       - in: path
 *         name: categoryID
 *         required: true
 *         description: ID of the category to remove
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User ID to authorize the action
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user making the request
 *     responses:
 *       200:
 *         description: Category removed successfully from the course
 *       400:
 *         description: Error removing category
 */
router.post("/:courseID/remove-category/:categoryID", (req: Request, res: Response) => categoryOfCourseController.removeCategoryFromCourse(req, res));

/**
 * @swagger
 * /course/{courseID}/categories:
 *   get:
 *     summary: Get categories of a course
 *     tags: [CategoryOfCourse]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryID:
 *                     type: integer
 *                     description: ID of the category
 *                   name:
 *                     type: string
 *                     description: Name of the category
 *       400:
 *         description: Error retrieving categories
 */
router.get("/:courseID/categories", (req: Request, res: Response) => categoryOfCourseController.getCategoriesOfCourse(req, res));

export default router;
