const express = require("express");
const multer = require("multer");
const courseController = require("../controllers/course/courseController");
const chapterController = require("../controllers/course/chapterController");
const videoController = require("../controllers/course/videoController");
const courseValidator = require('../validation/courseValidation');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/create",courseValidator.createCourse, courseController.createCourse);
router.post("/update/name", courseController.updateCourseName);

// Chapter
router.post("/chapter/create", chapterController.create);
router.post("/chapter/update/name", chapterController.updateChapterName);

// Video 
router.post("/video/create",upload.single("video"), videoController.uploadVideo)

module.exports = router;
