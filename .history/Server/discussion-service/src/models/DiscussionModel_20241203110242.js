const mysql = require("mysql2/promise");
const connection = require("../../config/database/db");

const Discussion = {
  createDiscussion: async (req, res) => {
    try {
      const { courseID } = req.params;
      const { userID, content } = req.body;

      const newDiscussion = await discussionModel.create({
        courseID,
        userID,
        content,
      });
      return res.status(201).json({
        success: true,
        message: "Discussion created",
        data: newDiscussion,
      });
    } catch (error) {
      console.error("Error creating discussion:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to create discussion" });
    }
  },

  getDiscussions: async (req, res) => {
    try {
      const { courseID } = req.params;
      const discussions = await discussionModel.findAll({ courseID });
      return res.status(200).json({ success: true, data: discussions });
    } catch (error) {
      console.error("Error fetching discussions:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch discussions" });
    }
  },

  create: ({ courseID, userID, content }) => {
    const query = `INSERT INTO discussion (CourseID, UserID, Content) VALUES (?, ?, ?)`;
    return connection.query(query, [courseID, userID, content]);
  },

  findByCourseID: (courseID) => {
    const query = `SELECT * FROM discussion WHERE CourseID = ?`;
    return connection.query(query, [courseID]);
  },

  update: (discussionID, userID, content) => {
    const query = `UPDATE discussion SET Content = ? WHERE DiscussionID = ? AND UserID = ?`;
    return connection.query(query, [content, discussionID, userID]);
  },

  delete: (discussionID, userID) => {
    const query = `DELETE FROM discussion WHERE DiscussionID = ? AND UserID = ?`;
    return connection.query(query, [discussionID, userID]);
  },
};

module.exports = Discussion;
