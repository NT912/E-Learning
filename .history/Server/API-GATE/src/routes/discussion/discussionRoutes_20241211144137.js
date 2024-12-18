// routes/discussionRoutes.js
const express = require("express");
const axios = require("axios");

const router = express.Router();

// Định nghĩa các route để truy vấn hoặc thao tác với discussion-service

// Tạo mới một discussion
router.post("/courses/:courseID/discussions", async (req, res) => {
  try {
    const { courseID } = req.params;
    const { content } = req.body;
    const userID = req.user.id; // ID của người dùng được xác thực thông qua token (giả sử có auth middleware)

    const response = await axios.post(
      `http://discussion-service:3007/discussions/courses/${courseID}/discussions`,
      { userID, content }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create discussion",
      error: error.message,
    });
  }
});

// Lấy tất cả discussions cho một course
router.get("/courses/:courseID/discussions", async (req, res) => {
  try {
    const { courseID } = req.params;

    const response = await axios.get(
      `http://discussion-service:3007/discussions/courses/${courseID}/discussions`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch discussions",
      error: error.message,
    });
  }
});

// Cập nhật một discussion
router.put("/discussions/:discussionID", async (req, res) => {
  try {
    const { discussionID } = req.params;
    const { content } = req.body;
    const userID = req.user.id;

    const response = await axios.put(
      `http://discussion-service:3007/discussions/discussions/${discussionID}`,
      { userID, content }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update discussion",
      error: error.message,
    });
  }
});

// Xóa một discussion
router.delete("/discussions/:discussionID", async (req, res) => {
  try {
    const { discussionID } = req.params;
    const userID = req.user.id;

    const response = await axios.delete(
      `http://discussion-service:3007/discussions/discussions/${discussionID}`,
      { data: { userID } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete discussion",
      error: error.message,
    });
  }
});

// Tạo reply cho một discussion
router.post("/discussions/:discussionID/replies", async (req, res) => {
  try {
    const { discussionID } = req.params;
    const { content } = req.body;
    const userID = req.user.id;

    const response = await axios.post(
      `http://discussion-service:3007/discussions/discussions/${discussionID}/replies`,
      { userID, content }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create reply",
      error: error.message,
    });
  }
});

// Lấy tất cả replies của một discussion
router.get("/discussions/:discussionID/replies", async (req, res) => {
  try {
    const { discussionID } = req.params;

    const response = await axios.get(
      `http://discussion-service:3007/discussions/discussions/${discussionID}/replies`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch replies",
      error: error.message,
    });
  }
});

module.exports = router;
