const express = require("express");
const multer = require("multer");
const courseController = require("../../controllers/course/courseController");
const authMiddleware = require("../../middleware/authMiddleware");
const courseValidator = require("../../validation/course/courseValidator");

const router = express.Router();
const upload = multer(); 

/**
 * @swagger
 * /course/create:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     description: Endpoint to create a new course. Requires a valid user token.
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course created successfully."
 *                 courseId:
 *                   type: integer
 *                   example: 1
 */

router.post("/create", authMiddleware.techerRequire ,courseController.createCourse);
router.get("/:courseID/details", courseController.getCourseDetails);

/**
 * @swagger
 * /course/{courseID}/update/name:
 *   patch:
 *     summary: Update the course name
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     description: Update the name of a specific course. Requires teacher authentication.
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course to update
 *     requestBody:
 *       description: New course name
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *                 description: The new name for the course
 *                 example: "Advanced JavaScript Programming"
 *     responses:
 *       200:
 *         description: Course name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course name updated successfully."
 *       400:
 *         description: Invalid input or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Course name is required and must not exceed 100 characters."
 *       401:
 *         description: Unauthorized - teacher access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access - teacher role required."
 *       403:
 *         description: Forbidden - invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is invalid or has expired. Please login again."
 */
router.patch("/:courseID/update/name", authMiddleware.techerRequire, courseValidator.updateCourseName, courseController.updateCourseName);

/**
 * @swagger
 * /course/{courseID}/update/avatar:
 *   patch:
 *     summary: Update the course avatar
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course to update
 *     requestBody:
 *       description: New avatar file for the course
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The new avatar file for the course
 *     responses:
 *       200:
 *         description: Course avatar updated successfully
 *       400:
 *         description: Error in updating course avatar
 */
router.patch("/:courseID/update/avatar", authMiddleware.techerRequire, upload.single("file"), courseValidator.updateCourseAvatar, courseController.updateCourseAvatar);

/**
 * @swagger
 * /course/{courseID}/update/shortcut:
 *    patch:
 *     summary: Update the course shortcut
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated shortcut content and user ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new shortcut content for the course
 *     responses:
 *       200:
 *         description: Course shortcut updated successfully
 *       400:
 *         description: Error in updating course shortcut
 */
router.patch("/:courseID/update/shortcut", authMiddleware.techerRequire, courseValidator.updateShortcut, courseController.updateCourseShortcut);

/**
 * @swagger
 * /course/{courseID}/confirm:
 *   patch:
 *     summary: Confirm course when creating a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to confirm
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course confirmed successfully
 *       400:
 *         description: Error in confirming course
 */
router.patch("/:courseID/confirm", authMiddleware.techerRequire, courseController.confirmCourse);

/**
 * @swagger
 * /course/{courseID}/status/rejected:
 *   patch:
 *     summary: Set course status to "rejected"
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update status
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course status updated to "rejected" successfully
 *       400:
 *         description: Error in updating course status
 */
router.patch("/:courseID/status/rejected", authMiddleware.techerRequire, (req, res) => courseController.updateStatus(req, res, "rejected"));
router.patch("/:courseID/update/description", courseController.updateCourseDescription);
router.patch("/:courseID/update/cost", courseController.updateCourseCost);
router.patch("/:courseID/update-level", courseController.updateCourseLevel);
router.patch("/:courseID/update-status", courseController.updateCourseStatus);
router.get("/getall", courseController.getAll);

module.exports = router;
