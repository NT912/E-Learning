const express = require("express");
const multer = require("multer");
const courseController = require("../../controllers/course/courseController");
const authMiddleware = require("../../middleware/authMiddleware");
const courseValidator = require("../../validation/course/courseValidator");

const chapterRoutes = require("./chapterRoutes");
const lessonRoutes = require("./lessonRoutes");
const dependRoutes = require("./dependRoutes");
const categoryRoute = require("./categoryRoures");

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

router.post(
  "/create",
  authMiddleware.techerRequire,
  courseController.createCourse
);

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
router.patch(
  "/:courseID/update/name",
  authMiddleware.techerRequire,
  courseValidator.updateCourseName,
  courseController.updateCourseName
);

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
router.patch(
  "/:courseID/update/avatar",
  authMiddleware.techerRequire,
  upload.single("file"),
  courseValidator.updateCourseAvatar,
  courseController.updateCourseAvatar
);

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
router.patch(
  "/:courseID/update/shortcut",
  authMiddleware.techerRequire,
  courseValidator.updateShortcut,
  courseController.updateCourseShortcut
);

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
router.patch(
  "/:courseID/confirm",
  authMiddleware.techerRequire,
  courseController.confirmCourse
);

// /**
//  * @swagger
//  * /course/{courseID}/rejected:
//  *   patch:
//  *     summary: Set course status to "rejected"
//  *     tags: [Course]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: courseID
//  *         required: true
//  *         description: ID of the course to update status
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Course status updated to "rejected" successfully
//  *       400:
//  *         description: Error in updating course status
//  */
// router.patch("/:courseID/rejected", authMiddleware.adminRequire, courseController.rejectCourse);

/**
 * @swagger
 * /course/{courseID}/reject:
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
router.patch(
  "/:courseID/reject",
  authMiddleware.adminRequire,
  courseController.rejectCourse
);

/**
 * @swagger
 * /course/{courseID}/approve:
 *   patch:
 *     summary: Set course status to "approval"
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
router.patch(
  "/:courseID/approve",
  authMiddleware.adminRequire,
  courseController.approveCourse
);

/**
 * @swagger
 * /course/{courseID}/active:
 *   patch:
 *     summary: Set course status to "active"
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
 *         description: Course status updated to "active" successfully
 *       400:
 *         description: Error in updating course status
 */
router.patch(
  "/:courseID/active",
  authMiddleware.techerRequire,
  courseController.activeCourse
);

/**
 * @swagger
 * /course/{courseID}/block:
 *   patch:
 *     summary: Set course status to "block"
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
 *         description: Course status updated to "blocked" successfully
 *       400:
 *         description: Error in updating course status
 */
router.patch(
  "/:courseID/block",
  authMiddleware.adminRequire,
  courseController.blockCourse
);

/**
 * @swagger
 * /course/{courseID}/update/cost:
 *   patch:
 *     summary: Update the cost of a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update cost
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated cost for the course
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The new cost for the course
 *                 example: 100.0
 *     responses:
 *       200:
 *         description: Course cost updated successfully
 *       400:
 *         description: Error in updating course cost
 */
router.patch(
  "/:courseID/update/cost",
  authMiddleware.techerRequire,
  courseValidator.updateCost,
  courseController.updateCourseCost
);

/**
 * @swagger
 * /course/{courseID}/update/description:
 *   patch:
 *     summary: Update the description of a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update description
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated description for the course
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new description for the course
 *                 example: "This is a detailed description of the course."
 *     responses:
 *       200:
 *         description: Course description updated successfully
 *       400:
 *         description: Error in updating course description
 */
router.patch(
  "/:courseID/update/description",
  authMiddleware.techerRequire,
  courseValidator.updateDescription,
  courseController.updateCourseDescription
);

/**
 * @swagger
 * /course/{courseID}/update/level:
 *   patch:
 *     summary: Update the level of a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update level
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated level for the course
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               level:
 *                 type: string
 *                 description: The new level for the course
 *                 enum: [begin, intermediate, advanced, mix]
 *                 example: "intermediate"
 *     responses:
 *       200:
 *         description: Course level updated successfully
 *       400:
 *         description: Error in updating course level
 */
router.patch(
  "/:courseID/update/level",
  authMiddleware.techerRequire,
  courseValidator.updateLevel,
  courseController.updateCourseLevel
);

/**
 * @swagger
 * /course/{courseID}/update/category:
 *   patch:
 *     summary: Update the level of a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update category
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated level for the course
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryID:
 *                 type: int
 *                 description: The new category ID for the course
 *     responses:
 *       200:
 *         description: Course level updated successfully
 *       400:
 *         description: Error in updating course level
 */
router.patch(
  "/:courseID/update/category",
  authMiddleware.techerRequire,
  courseValidator.updateCategory,
  courseController.updateCategory
);
// router.patch("/:courseID/update/level", authMiddleware.techerRequire, courseValidator.updateLevel, courseController.updateCourseLevel);

/**
 * @swagger
 * /course/getall:
 *   get:
 *     summary: Update the level of a course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course level updated successfully
 *       400:
 *         description: Error in updating course level
 */
router.get("/getall", courseController.getAll);

/**
 * @swagger
 * /course/{courseID}:
 *   get:
 *     summary: Detail a course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update category
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course level updated successfully
 *       400:
 *         description: Error in updating course level
 */
router.get("/:courseID", courseController.getDetail);

router.use("/chapter", chapterRoutes);
router.use("/lesson", lessonRoutes);
router.use("/course-depend", dependRoutes);
router.use("/category", categoryRoute);
// router.use("/outcome", outcomeRoute);
// router.use("/outcome", outcomeRoute);

module.exports = router;
