import { signup, login } from "~/controller/authController";
const express = require("express");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export const authRoutes = {
  router,
};
