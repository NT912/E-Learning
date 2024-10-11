import { signup, login } from "~/controllers/authController"; // Import trực tiếp các hàm signup và login
import express from "express"; // Sử dụng cú pháp ES Modules cho Express

const router = express.Router();

router.post("/signup", signup); // Đăng ký route cho signup
router.post("/login", login); // Đăng ký route cho login

export default router; // Export router đúng cách
