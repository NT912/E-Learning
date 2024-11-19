const connection = require("../../config/database/db");

const Discussion = {
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
