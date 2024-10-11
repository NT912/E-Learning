const express = require("express");

import { signup, login } from "~/contrller/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export const authRoutes = {
  router,
};
