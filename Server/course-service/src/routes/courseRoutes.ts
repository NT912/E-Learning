import express, { Request, Response } from "express";
import multer from "multer";
import courseController from "../controllers/courseController";
import courseValidator from "../validation/courseValidation";

// Importing sub-routes
import chapterRoutes from "./chapterRoutes";
import lessonRoutes from "./lessonRoutes";
import outcomeRoutes from "./outcomeRoutes";
import categoryRoutes from "./categoryRoutes";
import courseDependRoutes from "./depenCourseRoutes";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

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
router.post("/create", courseValidator.createCourse, (req: Request, res: Response) => courseController.createCourse(req, res));

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
router.get("/:courseID/details", (req: Request, res: Response) => courseController.getCourseDetails(req, res));

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
router.post("/:courseID/update/name", courseValidator.updateCourseName, (req: Request, res: Response) => courseController.updateCourseName(req, res));

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
router.post("/:courseID/update/avatar", upload.single("file"), courseValidator.updateCourseAvatar, (req: Request, res: Response) => courseController.updateCourseAvatar(req, res));

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
router.post("/:courseID/confirm", courseValidator.confirmCourse, (req: Request, res: Response) => courseController.confirm(req, res));

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
router.post("/:courseID/update/shortcut", courseValidator.updateCourseShortcut, (req: Request, res: Response) => courseController.updateCourseShortcut(req, res));

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
router.post("/:courseID/update/description", courseValidator.updateCourseDescription, (req: Request, res: Response) => courseController.updateCourseDescription(req, res));

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
router.post("/:courseID/update/cost", courseValidator.updateCourseCost, (req: Request, res: Response) => courseController.updateCourseCost(req, res));


/**
 * @swagger
 * /course/{courseID}/update-level:
 *   post:
 *     summary: Update the level of a course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Object containing new level and userID.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                - level
 *                - userID
 *              properties:
 *                level:
 *                  type: string
 *                  description: New level for the course
 *                  enum: [begin, intermediate, advanced, mix]
 *                userID:
 *                  type: integer
 *                  description: ID of the user making the update
 *     responses:
 *       200:
 *         description: Course level updated successfully
 *       400:
 *         description: Invalid level, course ID, or user ID; or other error updating course level
 */

router.post("/:courseID/update-level", courseValidator.updateCourseLevel, (req: Request, res: Response) =>
    courseController.updateCourseLevel(req, res)
  );

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
router.post("/:courseID/update-status", (req: Request, res: Response) => courseController.updateState(req, res));

/**
 * @swagger
 * /course/getall:
 *   get:
 *     summary: Get a paginated list of courses with optional filters
 *     tags: [Course]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: false
 *         description: The starting position to retrieve courses (default is 0).
 *         schema:
 *           type: integer
 *           default: 0
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of courses to retrieve (default is 20).
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: category
 *         required: false
 *         description: Filter courses by category.
 *         schema:
 *           type: string
 *       - in: query
 *         name: free
 *         required: false
 *         description: Filter for free courses (true or false).
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: minPrice
 *         required: false
 *         description: Minimum price for filtering courses.
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         description: Maximum price for filtering courses.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of courses retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the course.
 *                   avatar:
 *                     type: string
 *                     description: URL of the course avatar.
 *                   cost:
 *                     type: number
 *                     description: Cost of the course.
 *                   lessonCount:
 *                     type: integer
 *                     description: Number of lessons in the course.
 *                   totalDuration:
 *                     type: number
 *                     description: Total duration of the course.
 *       400:
 *         description: Bad request due to invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the issue.
 */
router.get("/getall", (req: Request, res: Response) => courseController.getAll(req, res));


// Sub-routes
router.use("/chapter", chapterRoutes);
router.use("/lesson", lessonRoutes);
router.use("/outcome", outcomeRoutes);
router.use("/category", categoryRoutes);
router.use("/course-depend", courseDependRoutes);

export default router;
