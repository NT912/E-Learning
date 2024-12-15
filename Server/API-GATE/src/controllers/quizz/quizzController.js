// controllers/quizzController.js
const axios = require("axios");
const config = require("../../../config/index");

const QUIZZ_SERVICE_URL = config.service_host.quizz;

const quizzController = {
  // Create a new quiz
  createQuiz: async (req, res) => {
    try {
      const response = await axios.post(
        `${QUIZZ_SERVICE_URL}/quizz/create`,
        req.body
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  // Find a quiz by ID
  getQuizById: async (req, res) => {
    try {
      const response = await axios.post(
        `${QUIZZ_SERVICE_URL}/findQuizz`,
        req.body
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error finding quiz:", error);
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  // Create a new question
  createQuestion: async (req, res) => {
    try {
      const response = await axios.post(
        `${QUIZZ_SERVICE_URL}/questions`,
        req.body,
        {
          headers: req.headers, // Pass headers (e.g., for file uploads)
        }
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  // Get questions by quiz ID
  getQuestionsByQuiz: async (req, res) => {
    try {
      const { QuizzID } = req.params;
      const response = await axios.get(
        `${QUIZZ_SERVICE_URL}/quizzes/${QuizzID}/questions`
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error retrieving questions:", error);
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  // Submit user answer
  submitUserAnswer: async (req, res) => {
    try {
      const response = await axios.post(
        `${QUIZZ_SERVICE_URL}/userAnswers`,
        req.body
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error submitting user answer:", error);
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  // Get user answer by UserID and QuestionID
  getUserAnswer: async (req, res) => {
    try {
      const { UserID, QuestionID } = req.params;
      const response = await axios.get(
        `${QUIZZ_SERVICE_URL}/userAnswers/${UserID}/${QuestionID}`
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error retrieving user answer:", error);
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },
};

module.exports = quizzController;
