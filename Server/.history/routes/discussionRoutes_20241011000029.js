const express = require("express");
import {
  createDiscussion,
  getDiscussionsByCourse,
} from "../controllers/discussionController";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/create", verifyToken, createDiscussion);
router.get("/course/:courseID", verifyToken, getDiscussionsByCourse);

module.exports = router;
