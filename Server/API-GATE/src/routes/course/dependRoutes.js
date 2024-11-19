const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const courseDependController = require("../../controllers/course/dependController");

const router = express.Router();

/**
 * @swagger
 * /course/course-depend/{courseID}/add-depend:
 *   post:
 *     summary: Add dependency to a course
 *     tags: [CourseDepend]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User ID, dependency course ID, and requirement flag
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dependOnCourseID:
 *                 type: integer
 *                 description: ID of the course to depend on
 *               isRequire:
 *                 type: boolean
 *                 description: Whether the dependency is required
 *     responses:
 *       201:
 *         description: Dependency added successfully
 *       400:
 *         description: Error adding dependency
 */
router.post("/:courseID/add-depend", authMiddleware.techerRequire, courseDependController.addCourseDepend);

/**
 * @swagger
 * /course/course-depend/{courseID}/remove-depend/{dependOnCourseID}:
 *   delete:
 *     summary: Remove a dependency from a course
 *     tags: [CourseDepend]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *       - in: path
 *         name: dependOnCourseID
 *         required: true
 *         description: ID of the dependency course
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dependency removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dependency removed successfully"
 *       400:
 *         description: Error removing dependency
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error removing dependency"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.delete("/:courseID/remove-depend/:dependOnCourseID", authMiddleware.techerRequire, courseDependController.removeCourseDepend);

/**
 * @swagger
 * /course/course-depend/{courseID}/dependencies:
 *   get:
 *     summary: Get dependencies of a course
 *     tags: [CourseDepend]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dependencies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dependOnCourseID:
 *                     type: integer
 *                   isRequire:
 *                     type: boolean
 *                   DependCourseName:
 *                     type: string
 *       400:
 *         description: Error retrieving dependencies
 */
router.get("/:courseID/dependencies", courseDependController.getCourseDependencies);

module.exports = router;
