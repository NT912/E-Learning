const express = require("express");
const ExerciseController = require("../controllers/exercise/exerciseController");

const router = express.Router();

// Tạo bài tập
router.post("/create", ExerciseController.createExercise);

// Nộp bài tập
router.post("/submit", ExerciseController.submitExercise);

module.exports = router;
