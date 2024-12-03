const mysql = require("mysql2/promise");
const connection = require("../../config/database/db");

const DiscussionReply = {
  create: ({ discussionID, userID, content }) => {
    const query = `INSERT INTO discussion_reply (DiscussionID, UserID, Content) VALUES (?, ?, ?)`;
    return connection.query(query, [discussionID, userID, content]);
  },

  findByDiscussionID: (discussionID) => {
    const query = `SELECT * FROM discussion_reply WHERE DiscussionID = ?`;
    return connection.query(query, [discussionID]);
  },

  update: (replyID, userID, content) => {
    const query = `UPDATE discussion_reply SET Content = ? WHERE ReplyID = ? AND UserID = ?`;
    return connection.query(query, [content, replyID, userID]);
  },

  delete: (replyID, userID) => {
    const query = `DELETE FROM discussion_reply WHERE ReplyID = ? AND UserID = ?`;
    return connection.query(query, [replyID, userID]);
  },
};

module.exports = DiscussionReply;
