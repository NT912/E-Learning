import express from "express";
import {
  createDiscussion,
  getDiscussionsByCourse,
} from "~/controllers/discussionController";
import { verifyToken } from "~/middleware/authMiddleware";

const router = express.Router();

router.post("/create", verifyToken, createDiscussion);
router.get("/course/:courseID", verifyToken, getDiscussionsByCourse);

export default router; // Export trực tiếp router
