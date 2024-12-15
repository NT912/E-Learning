// src/routes/apiGatewayRoutes.ts
import express from 'express';
import * as enrollmentGatewayController from '../../controllers/enrolment/enrollmentController';
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /enrollment/create/{courseID}:
 *   post:
 *     summary: Create a new enrollment for a specific course
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the course
 *     requestBody:
 *       description: Details required to create a new enrollment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cost:
 *                 type: float
 *                 example: 100
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 enrollmentID:
 *                   type: integer
 *                   description: ID of the newly created enrollment
 *                   example: 456
 *       400:
 *         description: Error creating enrollment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the issue
 *                   example: "Invalid course ID"
 */
router.post('/create/:courseID', authMiddleware.studentRequire ,enrollmentGatewayController.createEnrollment);


router.get('/:courseID', enrollmentGatewayController.getEnrollmentById);

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
 *       description: User ID and new status for the enrollment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user making the request
 *                 example: 123
 *               status:
 *                 type: string
 *                 description: New status for the enrollment
 *                 enum: [buying, cancelled, bought, learning, completed]
 *                 example: "bought"
 *     responses:
 *       200:
 *         description: Enrollment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Enrollment status updated successfully"
 *       400:
 *         description: Error updating enrollment status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "Error updating enrollment status"
 *                   example: "Invalid status"
 */
router.patch('/:enrollmentID/status', authMiddleware.studentRequire, enrollmentGatewayController.updateEnrollmentStatus);

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
 *         description: The ID of the enrollment to be deleted
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
 *                 description: ID of the user making the request
 *                 example: 123
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Enrollment deleted successfully"
 *       400:
 *         description: Error deleting enrollment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting enrollment"
 */
router.delete('/:enrollmentID', authMiddleware.studentRequire, enrollmentGatewayController.deleteEnrollment);
/**
 * @swagger
 * /enrollment/get-by-course/{courseID}:
 *   get:
 *     summary: Get all enrollments for a specific course
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   enrollmentID:
 *                     type: integer
 *                     example: 456
 *                   userID:
 *                     type: integer
 *                     example: 123
 *                   status:
 *                     type: string
 *                     example: "buying"
 *       400:
 *         description: Error retrieving enrollments
 */
router.get('/get-by-course/:courseID', enrollmentGatewayController.getAllEnrollmentsByCourse);


/**
 * @swagger
 * /enrollment/get-by-user:
 *   get:
 *     summary: Get all enrollments for a specific user
 *     tags: [Enrollment]
 *     responses:
 *       200:
 *         description: Enrollments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   enrollmentID:
 *                     type: integer
 *                     example: 456
 *                   courseID:
 *                     type: integer
 *                     example: 789
 *                   status:
 *                     type: string
 *                     example: "learning"
 *       400:
 *         description: Error retrieving enrollments
 */
router.get('/get-by-user', authMiddleware.studentRequire, enrollmentGatewayController.getAllEnrollmentsByUser);

export default router;
