import express from "express";
import { createCourse, getCourses } from "~/controllers/courseController";
import { verifyToken } from "~/middleware/authMiddleware";

const router = express.Router();

router.post("/create", createCourse);
router.post("/update/title", createCourse);

// Export trực tiếp router
export default router;
