const { Discussion, Reply } = require("../models"); // Giả sử bạn đang dùng Sequelize hoặc Mongoose
const sendResponse = require("../helpers/sendResponse");

const discussionController = {
  createDiscussion: async (req, res) => {
    try {
      const { courseID } = req.params;
      const { content, title } = req.body; // Giả sử bạn có title cho thảo luận
      const userID = req.user.id;

      // Tạo thảo luận mới
      const discussion = await Discussion.create({
        title,
        content,
        courseID,
        userID,
      });

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

      // Lấy tất cả thảo luận của khóa học
      const discussions = await Discussion.findAll({
        where: { courseID },
      });

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
      const { content, title } = req.body;
      const userID = req.user.id;

      // Cập nhật thảo luận
      const discussion = await Discussion.findOne({
        where: { id: discussionID, userID },
      });

      if (!discussion) {
        return sendResponse(
          res,
          false,
          "Discussion not found or not authorized"
        );
      }

      discussion.title = title || discussion.title;
      discussion.content = content || discussion.content;
      await discussion.save();

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

      // Xóa thảo luận
      const discussion = await Discussion.findOne({
        where: { id: discussionID, userID },
      });

      if (!discussion) {
        return sendResponse(
          res,
          false,
          "Discussion not found or not authorized"
        );
      }

      await discussion.destroy();

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

      // Tạo trả lời cho thảo luận
      const reply = await Reply.create({
        content,
        discussionID,
        userID,
      });

      return sendResponse(res, true, "Reply created successfully", reply);
    } catch (error) {
      return sendResponse(res, false, "Failed to create reply", error.message);
    }
  },

  getReplies: async (req, res) => {
    try {
      const { discussionID } = req.params;

      // Lấy tất cả các trả lời cho thảo luận
      const replies = await Reply.findAll({
        where: { discussionID },
      });

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

      // Cập nhật trả lời
      const reply = await Reply.findOne({
        where: { id: replyID, userID },
      });

      if (!reply) {
        return sendResponse(res, false, "Reply not found or not authorized");
      }

      reply.content = content || reply.content;
      await reply.save();

      return sendResponse(res, true, "Reply updated successfully");
    } catch (error) {
      return sendResponse(res, false, "Failed to update reply", error.message);
    }
  },

  deleteReply: async (req, res) => {
    try {
      const { replyID } = req.params;
      const userID = req.user.id;

      // Xóa trả lời
      const reply = await Reply.findOne({
        where: { id: replyID, userID },
      });

      if (!reply) {
        return sendResponse(res, false, "Reply not found or not authorized");
      }

      await reply.destroy();

      return sendResponse(res, true, "Reply deleted successfully");
    } catch (error) {
      return sendResponse(res, false, "Failed to delete reply", error.message);
    }
  },
};

module.exports = discussionController;
