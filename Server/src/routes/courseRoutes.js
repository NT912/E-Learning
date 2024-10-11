import express from "express";
import { courseController } from "~/controllers/courseController";
import { verifyToken } from "~/middleware/authMiddleware";

const router = express.Router();

router.post("/create", courseController.createCourse);
router.post("/update/title", courseController.createCourse);

export default router;
