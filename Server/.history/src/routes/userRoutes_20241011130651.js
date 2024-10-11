import express from "express";
import { userController } from "~/controllers/userController";
import { verifyToken } from "~/middleware/authMiddleware";

const router = express.Router();

router.get("/profile", verifyToken, userController.getUserProfile());

export default router;
