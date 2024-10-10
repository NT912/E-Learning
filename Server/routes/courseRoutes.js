const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create",  createCourse);
router.post("/update/title",  createCourse);

module.exports = router;
