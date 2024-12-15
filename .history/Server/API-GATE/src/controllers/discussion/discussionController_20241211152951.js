const DiscussionService = require("../../services/discussionService");
const sendResponse = require("../helpers/sendResponse");

const discussionController = {
  // Tạo một thảo luận mới
  createDiscussion: async (req, res) => {
    try {
      const { courseID } = req.params;
      const { content } = req.body;
      const userID = req.user.id;
      const discussion = await DiscussionService.createDiscussion(
        courseID,
        userID,
        content
      );
      return sendResponse(
        res,
        true,
        "Discussion created successfully",
        discussion
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        "Failed to create discussion",
        error.message
      );
    }
  },

  // Lấy tất cả các thảo luận của khóa học
  getDiscussions: async (req, res) => {
    try {
      const { courseID } = req.params;
      const discussions = await DiscussionService.getDiscussions(courseID);
      return sendResponse(
        res,
        true,
        "Fetched discussions successfully",
        discussions
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        "Failed to fetch discussions",
        error.message
      );
    }
  },

  // Cập nhật thảo luận
  updateDiscussion: async (req, res) => {
    try {
      const { discussionID } = req.params;
      const { content } = req.body;
      const userID = req.user.id;
      await DiscussionService.updateDiscussion(discussionID, userID, content);
      return sendResponse(res, true, "Discussion updated successfully");
    } catch (error) {
      return sendResponse(
        res,
        false,
        "Failed to update discussion",
        error.message
      );
    }
  },

  // Xóa thảo luận
  deleteDiscussion: async (req, res) => {
    try {
      const { discussionID } = req.params;
      const userID = req.user.id;
      await DiscussionService.deleteDiscussion(discussionID, userID);
      return sendResponse(res, true, "Discussion deleted successfully");
    } catch (error) {
      return sendResponse(
        res,
        false,
        "Failed to delete discussion",
        error.message
      );
    }
  },

  // Tạo một trả lời cho thảo luận
  createReply: async (req, res) => {
    try {
      const { discussionID } = req.params;
      const { content } = req.body;
      const userID = req.user.id;
      const reply = await DiscussionService.createReply(
        discussionID,
        userID,
        content
      );
      return sendResponse(res, true, "Reply created successfully", reply);
    } catch (error) {
      return sendResponse(res, false, "Failed to create reply", error.message);
    }
  },

  // Lấy tất cả các trả lời của thảo luận
  getReplies: async (req, res) => {
    try {
      const { discussionID } = req.params;
      const replies = await DiscussionService.getReplies(discussionID);
      return sendResponse(res, true, "Fetched replies successfully", replies);
    } catch (error) {
      return sendResponse(res, false, "Failed to fetch replies", error.message);
    }
  },

  // Cập nhật trả lời thảo luận
  updateReply: async (req, res) => {
    try {
      const { replyID } = req.params;
      const { content } = req.body;
      const userID = req.user.id;
      await DiscussionService.updateReply(replyID, userID, content);
      return sendResponse(res, true, "Reply updated successfully");
    } catch (error) {
      return sendResponse(res, false, "Failed to update reply", error.message);
    }
  },

  // Xóa trả lời thảo luận
  deleteReply: async (req, res) => {
    try {
      const { replyID } = req.params;
      const userID = req.user.id;
      await DiscussionService.deleteReply(replyID, userID);
      return sendResponse(res, true, "Reply deleted successfully");
    } catch (error) {
      return sendResponse(res, false, "Failed to delete reply", error.message);
    }
  },
};

module.exports = discussionController;
