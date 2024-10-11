import express from "express"; // Sử dụng cú pháp import cho Express
import { signup, login } from "~/controllers/authController"; // Import các hàm từ authController

const router = express.Router();

router.post("/signup", signup); // Đăng ký route POST cho /signup
router.post("/login", login); // Đăng ký route POST cho /login

export default router; // Export router trực tiếp
