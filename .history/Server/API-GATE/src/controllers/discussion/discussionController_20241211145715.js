const sendResponse = require("../helpers/sendResponse");
const Discussion = require("../models/Discussion"); // Giả sử bạn có model cho bài thảo luận

// Lấy tất cả các bài thảo luận
const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find();
    sendResponse(res, 200, "Fetched all discussions successfully", discussions);
  } catch (error) {
    sendResponse(res, 500, "Error fetching discussions");
  }
};

// Tạo bài thảo luận mới
const createDiscussion = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Giả sử bạn đã xác thực người dùng trong middleware authMiddleware

  try {
    const newDiscussion = new Discussion({
      title,
      content,
      userId,
      createdAt: new Date(),
    });

    await newDiscussion.save();
    sendResponse(res, 201, "Discussion created successfully", newDiscussion);
  } catch (error) {
    sendResponse(res, 500, "Error creating discussion");
  }
};

// Lấy chi tiết bài thảo luận theo ID
const getDiscussionById = async (req, res) => {
  const { id } = req.params;

  try {
    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return sendResponse(res, 404, "Discussion not found");
    }

    sendResponse(res, 200, "Fetched discussion successfully", discussion);
  } catch (error) {
    sendResponse(res, 500, "Error fetching discussion");
  }
};

module.exports = { getAllDiscussions, createDiscussion, getDiscussionById };
