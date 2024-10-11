import { db } from "../../config/db";

const Discussion = {
  create: (discussionData, callback) => {
    const sql = `INSERT INTO Discussions (UserID, CourseID, Content, CreatedAt) VALUES (?, ?, ?, ?)`;
    db.query(
      sql,
      [
        discussionData.userID,
        discussionData.courseID,
        discussionData.content,
        new Date(),
      ],
      callback
    );
  },
  getAll: (courseID, callback) => {
    const sql = `SELECT * FROM Discussions WHERE CourseID = ?`;
    db.query(sql, [courseID], callback);
  },
};

export { Discussion };
