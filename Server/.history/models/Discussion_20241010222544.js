const db = require("../config/db");

const Discussion = {
  create: (discussionData, callback) => {
    const sql = `INSERT INTO Discussion (Content, UserID, VideoID, CourseID, CreateAt) VALUES (?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        discussionData.content,
        discussionData.userID,
        discussionData.videoID,
        discussionData.courseID,
        new Date(),
      ],
      callback
    );
  },
  getByCourseID: (courseID, callback) => {
    const sql = `SELECT * FROM Discussion WHERE CourseID = ?`;
    db.query(sql, [courseID], callback);
  },
};

export const Discussion = {
  Discussion,
};
