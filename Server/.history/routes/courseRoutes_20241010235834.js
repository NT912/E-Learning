const express = require("express");
import { createCourse, getCourses } from "~/controllers/courseController";
const { verifyToken } from "~/middleware/authMiddleware";
const router = express.Router();

router.post("/create", verifyToken, createCourse);
router.get("/", getCourses);

module.exports = router;
