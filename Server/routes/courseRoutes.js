const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", verifyToken, createCourse);
router.get("/", getCourses);

module.exports = router;
