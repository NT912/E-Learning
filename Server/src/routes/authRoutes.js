import express from "express";
import { signup, login } from "~/controllers/authController";
import { validateSignup } from "~/validation/authValidation";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", login);

export default router;
