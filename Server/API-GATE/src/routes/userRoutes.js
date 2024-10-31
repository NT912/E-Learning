const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken } = require("~/middleware/authMiddleware");

const router = express.Router();

router.get("/profile", userController.getUserProfile);

module.exports = router;
