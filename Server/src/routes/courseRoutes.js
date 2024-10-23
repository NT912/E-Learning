const express = require("express");
const multer = require("multer");
const Role = require("../config/role");
const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });
const upload = multer({ dest: 'uploads/' });

//controller
const courseController = require("../controllers/course/courseController");
const chapterController = require("../controllers/course/chapterController");
const lessonController = require("../controllers/course/lessonController");

//Middleware
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

//validation
const courseValidator = require("../validation/courseValidation");
const chapterValidator = require("../validation/chapterValidation");
const lessonValidator = require("../validation/lessonValidation");

/*
Course
*/

router.post("/create",authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), courseController.createCourse);
router.post("/update/name/:courseID",authMiddleware.verifyToken, courseValidator.updateCourseName, courseController.updateCourseName);

//avatar
router.post("/update/avatar/:courseID",authMiddleware.verifyToken, upload.single('file'), courseController.updateCourseAvatar);

// status
router.post("/confirm/:courseID",authMiddleware.verifyToken, courseController.confirm);

// shortcut
router.post("/update/shortcut/:courseID",authMiddleware.verifyToken, courseValidator.updateCourseShortcut, courseController.updateCourseShortcut)

// description
router.post("/update/description/:courseID",authMiddleware.verifyToken, courseValidator.updateCourseDescription, courseController.updateCourseDescription)

// description
router.post("/update/cost/:courseID",authMiddleware.verifyToken, courseValidator.updateCourseCost, courseController.updateCourseCost)

/*
Chapter
*/
router.post("/chapter/create", authMiddleware.verifyToken, chapterValidator.create, chapterController.create);
router.post("/chapter/update/name/:chapterID", authMiddleware.verifyToken, chapterValidator.updateName, chapterController.updateChapterName);
router.post("/chapter/delete/:chapterID", authMiddleware.verifyToken, chapterController.deleteChapter);

/*
Lesson
*/
router.post("/lesson/create", authMiddleware.verifyToken, lessonValidator.create ,lessonController.create);
router.post("/lesson/update/:lessonID", authMiddleware.verifyToken, upload.single('file'), lessonValidator.update, lessonController.updateLesson);
router.post("/lesson/delete/:lessonID", authMiddleware.verifyToken, lessonController.delete);

router.post("/lesson/update/allowDemo/:lessonID", authMiddleware.verifyToken, lessonController.updateLessonAllowDemo);

module.exports = router;
