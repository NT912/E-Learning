const sendResponse = require("../../helpers/sendResponse");
const { query } = require("../../config/database"); // Sử dụng database connection

const discussionController = {
  createDiscussion: async (req, res) => {
    try {
      const { courseID } = req.params;
      const { content, title } = req.body; // Giả sử bạn có title cho thảo luận
      const userID = req.user.id;

      // Truy vấn SQL để tạo thảo luận mới
      const result = await query(
        `INSERT INTO discussions (title, content, courseID, userID) VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, content, courseID, userID]
      );

      return sendResponse(
        res,
        true,
        "Discussion created successfully",
        result.rows[0]
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

      // Truy vấn SQL để lấy tất cả thảo luận của khóa học
      const result = await query(
        `SELECT * FROM discussions WHERE courseID = $1`,
        [courseID]
      );

      return sendResponse(
        res,
        true,
        "Fetched discussions successfully",
        result.rows
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

      // Truy vấn SQL để cập nhật thảo luận
      const result = await query(
        `UPDATE discussions SET title = $1, content = $2 WHERE id = $3 AND userID = $4 RETURNING *`,
        [title, content, discussionID, userID]
      );

      if (result.rowCount === 0) {
        return sendResponse(
          res,
          false,
          "Discussion not found or not authorized"
        );
      }

      return sendResponse(
        res,
        true,
        "Discussion updated successfully",
        result.rows[0]
      );
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

      // Truy vấn SQL để xóa thảo luận
      const result = await query(
        `DELETE FROM discussions WHERE id = $1 AND userID = $2 RETURNING *`,
        [discussionID, userID]
      );

      if (result.rowCount === 0) {
        return sendResponse(
          res,
          false,
          "Discussion not found or not authorized"
        );
      }

      return sendResponse(
        res,
        true,
        "Discussion deleted successfully",
        result.rows[0]
      );
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

      // Truy vấn SQL để tạo trả lời cho thảo luận
      const result = await query(
        `INSERT INTO replies (content, discussionID, userID) VALUES ($1, $2, $3) RETURNING *`,
        [content, discussionID, userID]
      );

      return sendResponse(
        res,
        true,
        "Reply created successfully",
        result.rows[0]
      );
    } catch (error) {
      return sendResponse(res, false, "Failed to create reply", error.message);
    }
  },

  getReplies: async (req, res) => {
    try {
      const { discussionID } = req.params;

      // Truy vấn SQL để lấy tất cả các trả lời cho thảo luận
      const result = await query(
        `SELECT * FROM replies WHERE discussionID = $1`,
        [discussionID]
      );

      return sendResponse(
        res,
        true,
        "Fetched replies successfully",
        result.rows
      );
    } catch (error) {
      return sendResponse(res, false, "Failed to fetch replies", error.message);
    }
  },

  updateReply: async (req, res) => {
    try {
      const { replyID } = req.params;
      const { content } = req.body;
      const userID = req.user.id;

      // Truy vấn SQL để cập nhật trả lời
      const result = await query(
        `UPDATE replies SET content = $1 WHERE id = $2 AND userID = $3 RETURNING *`,
        [content, replyID, userID]
      );

      if (result.rowCount === 0) {
        return sendResponse(res, false, "Reply not found or not authorized");
      }

      return sendResponse(
        res,
        true,
        "Reply updated successfully",
        result.rows[0]
      );
    } catch (error) {
      return sendResponse(res, false, "Failed to update reply", error.message);
    }
  },

  deleteReply: async (req, res) => {
    try {
      const { replyID } = req.params;
      const userID = req.user.id;

      // Truy vấn SQL để xóa trả lời
      const result = await query(
        `DELETE FROM replies WHERE id = $1 AND userID = $2 RETURNING *`,
        [replyID, userID]
      );

      if (result.rowCount === 0) {
        return sendResponse(res, false, "Reply not found or not authorized");
      }

      return sendResponse(
        res,
        true,
        "Reply deleted successfully",
        result.rows[0]
      );
    } catch (error) {
      return sendResponse(res, false, "Failed to delete reply", error.message);
    }
  },
};

module.exports = discussionController;
