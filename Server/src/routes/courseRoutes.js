const express = require("express");
const courseController = require("~/controllers/course/courseController");

const router = express.Router();

router.post("/create", courseController.createCourse);
router.post("/update/name", courseController.updateCourseName);

module.exports = router;
