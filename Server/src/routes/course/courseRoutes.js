const express = require("express");
const multer = require("multer");
const Role = require("../../../config/");
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const courseController = require("../../controllers/course/courseController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");
const courseValidator = require("../../validation/courseValidation");

// Import các route con
const chapterRoutes = require("./chapterRoutes");
const lessonRoutes = require("./lessonRoutes");
const outcomeRoutes = require("./outcomeRoutes");
const categoryRoutes = require("./categoryRoutes");

/*
Course
*/
/**
 * @swagger
 * /course/create:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid input or missing fields
 */
router.post("/create", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), courseController.createCourse);

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
 *       description: The updated course name
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *                 description: The new name of the course
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       200:
 *         description: Course name updated successfully
 */
router.post("/:courseID/update/name", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), courseValidator.updateCourseName, courseController.updateCourseName);

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
 *       description: The new avatar for the course
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       200:
 *         description: Course avatar updated successfully
 */
router.post("/:courseID/update/avatar", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), upload.single('file'), courseController.updateCourseAvatar);

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
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       200:
 *         description: Course confirmed successfully
 */
router.post("/:courseID/confirm", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), courseController.confirm);

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
 *       description: The new shortcut for the course
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new shortcut for the course
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       200:
 *         description: Course shortcut updated successfully
 */
router.post("/:courseID/update/shortcut", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), courseValidator.updateCourseShortcut, courseController.updateCourseShortcut);

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
 *       description: The updated description of the course
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new description of the course
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       200:
 *         description: Course description updated successfully
 */
router.post("/:courseID/update/description", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), courseValidator.updateCourseDescription, courseController.updateCourseDescription);

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
 *       description: The updated cost of the course
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The new cost of the course
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       200:
 *         description: Course cost updated successfully
 */
router.post("/:courseID/update/cost", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), courseValidator.updateCourseCost, courseController.updateCourseCost);


router.use("/chapter", chapterRoutes);  
router.use("/lesson", lessonRoutes);    
router.use("/outcome", outcomeRoutes); 
router.use("/category", categoryRoutes);

module.exports = router;
