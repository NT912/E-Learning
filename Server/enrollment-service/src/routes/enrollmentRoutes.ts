// src/routes/enrollmentRoutes.ts
import express from "express";
import enrollmentController from "../controllers/enrollmentController";

const router = express.Router();

/**
 * @swagger
 * /enrollment:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollment]
 *     requestBody:
 *       description: Course ID and User ID for enrollment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseID:
 *                 type: integer
 *                 description: ID of the course
 *               userID:
 *                 type: integer
 *                 description: ID of the user
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *       400:
 *         description: Error creating enrollment
 */
router.post("/", enrollmentController.create);

/**
 * @swagger
 * /enrollment/{enrollmentID}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enrollment
 *     responses:
 *       200:
 *         description: Enrollment retrieved successfully
 *       404:
 *         description: Enrollment not found
 */
router.get("/:enrollmentID", enrollmentController.getById);

/**
 * @swagger
 * /enrollment/{enrollmentID}/status:
 *   patch:
 *     summary: Update enrollment status
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enrollment
 *     requestBody:
 *       description: User ID and new status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user
 *               status:
 *                 type: string
 *                 description: New status for the enrollment
 *     responses:
 *       200:
 *         description: Enrollment status updated successfully
 *       400:
 *         description: Error updating status
 */
router.patch("/:enrollmentID/status", enrollmentController.updateStatus);

/**
 * @swagger
 * /enrollment/{enrollmentID}:
 *   delete:
 *     summary: Delete an enrollment
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enrollment
 *     requestBody:
 *       description: User ID making the request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *       400:
 *         description: Error deleting enrollment
 */
router.delete("/:enrollmentID", enrollmentController.delete);

/**
 * @swagger
 * /enrollment/course/{courseID}:
 *   get:
 *     summary: Get all enrollments for a course
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: Enrollments retrieved successfully
 *       400:
 *         description: Error retrieving enrollments
 */
router.get("/course/:courseID", enrollmentController.getAllByCourse);

export default router;
