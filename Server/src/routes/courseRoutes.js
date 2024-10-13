const express = require("express");
const courseController = require("~/controllers/courseController");
const { verifyToken } = require("~/middleware/authMiddleware");

const router = express.Router();

router.post("/create", courseController.createCourse);
router.post("/update/title", courseController.updateCourseTitle);

module.exports = router;
