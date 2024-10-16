const express = require("express");
const courseController = require("../controllers/course/courseController");
const chapterController = require("../controllers/course/chapterController");
const videoController = require("../controllers/course/videoController");

const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const courseValidator = require("../validation/courseValidation");
const chapterValidator = require("../validation/chapterValidation");

const Role = require("../config/role");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.TEACHER),
  courseController.createCourse
);
router.post(
  "/update/name",
  authMiddleware.verifyToken,
  courseValidator.updateCourseName,
  courseController.updateCourseName
);

// Chapter
router.post("/chapter/create", authMiddleware.verifyToken, chapterValidator.create, chapterController.create);
router.post("/chapter/update/name", authMiddleware.verifyToken, chapterValidator.updateName, chapterController.updateChapterName);
router.delete("/chapter/delete/:chapterID", authMiddleware.verifyToken, chapterController.deleteChapter);

// Routes liên quan đến lesson
router.post("/lesson/create", lessonController.create);
router.post("/lesson/update", lessonController.updateLesson);
router.post("/lesson/delete", lessonController.delete);

module.exports = router;
