import express from "express"; // Sử dụng cú pháp import của ES Modules
import { getUserProfile } from "~/controllers/userController"; // Import hàm getUserProfile
import { verifyToken } from "~/middleware/authMiddleware";

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);

export const userRoutes = {
  router,
};
