const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
} = require("../controllers/courseController");
const router = express.Router();

router.post("/create", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);

module.exports = router;
