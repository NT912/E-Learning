const express = require("express");
const { signup, login } = require("../controllers/authController");
import {signup, login}

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export const authRoutes = {
  router,
};
