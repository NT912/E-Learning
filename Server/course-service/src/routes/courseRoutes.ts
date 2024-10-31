const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

const courseController = require("../controllers/courseController");
const courseValidator = require("../validation/courseValidation");

// Các route con
const chapterRoutes = require("./chapterRoutes");
const lessonRoutes = require("./lessonRoutes");
const outcomeRoutes = require("./outcomeRoutes");
const categoryRoutes = require("./categoryRoutes");
const courseDependRoutes = require("./depenCourseRoutes");

/**
 * @swagger
 * /course/create:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     requestBody:
 *       description: User ID for creating the course
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: ID of the user creating the course
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid input or missing fields
 */
router.post("/create", courseValidator.createCourse, courseController.createCourse);

/**
 * @swagger
 * /course/{courseID}/details:
 *   get:
 *     summary: Get detailed course information including chapters and lessons
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to retrieve details for
 *         schema:
 *           type: integer
 *       - in: query    
 *         name: userID
 *         required: true
 *         description: ID of the user to verify course ownership
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course details retrieved successfully
 *       400:
 *         description: Error retrieving course details
 */
router.get("/:courseID/details", courseController.getCourseDetails);

/**
 * @swagger
 * /course/{courseID}/update/name:
 *   post:
 *     summary: Update the course name
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated course name and user ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID: 
 *                 type: integer
 *                 description: The ID of the user updating the course
 *               courseName:
 *                 type: string
 *                 description: The new name of the course
 *     responses:
 *       200:
 *         description: Course name updated successfully
 *       400:
 *         description: Error in updating course name
 */
router.post("/:courseID/update/name", courseValidator.updateCourseName, courseController.updateCourseName);

/**
 * @swagger
 * /course/{courseID}/update/avatar:
 *   post:
 *     summary: Update the course avatar
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User ID and new avatar file for the course
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: The ID of the user updating the avatar
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
router.post("/:courseID/update/avatar", upload.single("file"), courseValidator.updateCourseAvatar, courseController.updateCourseAvatar);

/**
 * @swagger
 * /course/{courseID}/confirm:
 *   post:
 *     summary: Confirm the course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to confirm
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User ID for confirmation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: The ID of the user confirming the course
 *     responses:
 *       200:
 *         description: Course confirmed successfully
 *       400:
 *         description: Error in confirming course
 */
router.post("/:courseID/confirm", courseValidator.confirmCourse, courseController.confirm);

/**
 * @swagger
 * /course/{courseID}/update/shortcut:
 *   post:
 *     summary: Update the course shortcut
 *     tags: [Course]
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
 *               userID:
 *                 type: integer
 *                 description: The ID of the user updating the shortcut
 *               content:
 *                 type: string
 *                 description: The new shortcut content for the course
 *     responses:
 *       200:
 *         description: Course shortcut updated successfully
 *       400:
 *         description: Error in updating course shortcut
 */
router.post("/:courseID/update/shortcut", courseValidator.updateCourseShortcut, courseController.updateCourseShortcut);

/**
 * @swagger
 * /course/{courseID}/update/description:
 *   post:
 *     summary: Update the course description
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated description content and user ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: The ID of the user updating the description
 *               content:
 *                 type: string
 *                 description: The new description of the course
 *     responses:
 *       200:
 *         description: Course description updated successfully
 *       400:
 *         description: Error in updating course description
 */
router.post("/:courseID/update/description", courseValidator.updateCourseDescription, courseController.updateCourseDescription);

/**
 * @swagger
 * /course/{courseID}/update/cost:
 *   post:
 *     summary: Update the cost of the course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated cost and user ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: The ID of the user updating the cost
 *               amount:
 *                 type: number
 *                 description: The new cost of the course
 *     responses:
 *       200:
 *         description: Course cost updated successfully
 *       400:
 *         description: Error in updating course cost
 */
router.post("/:courseID/update/cost", courseValidator.updateCourseCost, courseController.updateCourseCost);

/**
 * @swagger
 * /course/{courseID}/update-status:
 *   post:
 *     summary: Update the status of a course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: integer
 *       - in: query
 *         name: state
 *         required: true
 *         description: New status for the course (e.g., creating, confirmed, rejected, approval, active, blocked)
 *         schema:
 *           type: string
 *           enum: [creating, confirmed, rejected, approval, active, blocked]
 *     responses:
 *       200:
 *         description: Course status updated successfully
 *       400:
 *         description: Invalid course status or other error updating course status
 */
router.post("/:courseID/update-status", courseController.updateCourseCost);

// router.delete("/:courseID", courseController.delete);



// Các route con
router.use("/chapter", chapterRoutes);
router.use("/lesson", lessonRoutes);
router.use("/outcome", outcomeRoutes);
router.use("/category", categoryRoutes);
router.use("/course-depend", courseDependRoutes);

module.exports = router;
