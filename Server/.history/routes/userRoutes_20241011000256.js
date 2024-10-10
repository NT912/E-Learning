const express = require("express");
import { getUserProfile } from "~/controllers/userController";
import { verifyToken } from "~/middleware/authMiddleware";
const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);

export const userRoutes = {
  router,
};
