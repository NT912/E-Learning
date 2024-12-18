// src/routes/enrollmentRoutes.ts
import express from "express";
import enrollmentController from "../controllers/enrollmentController";

const router = express.Router();

/**
 * @swagger
* /enrollment/create:
*   post:
*     summary: Create a new enrollment
*     tags: [Enrollment]
*     requestBody:
*       description: Details required to create a new enrollment
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               courseID:
*                 type: integer
*                 description: ID of the course
*                 example: 1
*               userID:
*                 type: integer
*                 description: ID of the user
*                 example: 123
*               status:
*                 type: string
*                 description: Initial status of the enrollment
*                 enum: [buying, cancelled, bought, learning, completed]
*                 example: buying
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
*                   example: "Course ID is required."
*/
router.post("/create", enrollmentController.create);

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
 *           description: The ID of the enrollment
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
 *                   example: "Error updating enrollment status"
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
 * /enrollment/{enrollmentID}/mark-as-bought:
 *   post:
 *     summary: Mark an enrollment as bought after successful payment
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
 *         description: Enrollment marked as bought successfully
 *       400:
 *         description: Error updating enrollment status to bought
 */
router.post("/:enrollmentID/mark-as-bought", enrollmentController.markAsBought);

/**
 * @swagger
 * /enrollment/{enrollmentID}/cancel:
 *   post:
 *     summary: Cancel an enrollment
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
 *         description: Enrollment cancelled successfully
 *       400:
 *         description: Error cancelling enrollment
 */
router.post("/:enrollmentID/cancel", enrollmentController.cancel);

/**
 * @swagger
 * /enrollment/get-by-course/{courseID}:
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
router.get("/get-by-course/:courseID", enrollmentController.getAllByCourse);

/**
 * @swagger
 * /enrollment/get-by-user/{userID}:
 *   get:
 *     summary: Get all enrollments for a course
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: userID
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
router.get("/get-by-user/:userID", enrollmentController.getAllbyUserID);

/**
 * @swagger
 * /enrollment/{enrollmentID}/rate:
 *   patch:
 *     summary: Rate an enrollment
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enrollment
 *     requestBody:
 *       description: User ID, rating, and optional review
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user
 *               rating:
 *                 type: integer
 *                 description: Rating value between 1 and 5
 *               review:
 *                 type: string
 *                 description: Optional review text
 *     responses:
 *       200:
 *         description: Enrollment rated successfully
 *       400:
 *         description: Error rating enrollment
 */
router.patch("/:enrollmentID/rate", enrollmentController.rate);

/**
 * @swagger
 * /enrollment/check-enroll/{userID}/{courseID}:
 *   get:
 *     summary: Rate an enrollment
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the course
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: Enrollment rated successfully
 *       400:
 *         description: Error rating enrollment
 */
router.get("/check-enroll/:userID/:courseID", enrollmentController.check_enroll);

export default router;
