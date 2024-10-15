const express = require("express");
const courseController = require("../controllers/course/courseController");
const chapterController = require("../controllers/course/chapterController");
const lessonController = require("../controllers/course/lessonController");
const courseValidator = require("../validation/courseValidation");

const router = express.Router();

// Routes liên quan đến course
router.post(
  "/create",
  courseValidator.createCourse,
  courseController.createCourse
);
router.post("/update/name", courseController.updateCourseName);

// Routes liên quan đến chapter
router.post("/chapter/create", chapterController.create);
router.post("/chapter/update/name", chapterController.updateChapterName);

// Routes liên quan đến lesson
router.post("/lesson/create", lessonController.create);
router.post("/lesson/update", lessonController.updateLesson);
router.post("/lesson/delete", lessonController.delete);

module.exports = router;
