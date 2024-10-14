const express = require("express");
const courseController = require("~/controllers/course/courseController");
const chapterController = require("~/controllers/course/chapterController");

const router = express.Router();

router.post("/create", courseController.createCourse);
router.post("/update/name", courseController.updateCourseName);

router.post("/chapter/create", chapterController.create);
router.post("/chapter/update/name", chapterController.updateChapterName);

module.exports = router;
