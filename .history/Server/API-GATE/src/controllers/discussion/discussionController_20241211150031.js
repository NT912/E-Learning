const DiscussionService = require("../services/discussionService");
const sendResponse = require("../helpers/sendResponse");

const discussionController = {
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

  getReplies: async (req, res) => {
    try {
      const { discussionID } = req.params;
      const replies = await DiscussionService.getReplies(discussionID);
      return sendResponse(res, true, "Fetched replies successfully", replies);
    } catch (error) {
      return sendResponse(res, false, "Failed to fetch replies", error.message);
    }
  },

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
