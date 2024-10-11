import express from "express";
import { signup, login } from "~/controllers/authController";

const router = express.Router();

router.post("/signup", signup); // Đăng ký route POST cho /signup
router.post("/login", login); // Đăng ký route POST cho /login

export default router; // Export router trực tiếp
