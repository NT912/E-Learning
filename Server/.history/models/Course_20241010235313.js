import { db } from "../config/db";

const Course = {
  create: (courseData, callback) => {
    const sql = `INSERT INTO Course (Name, Description, Cost, CategoryID, UserID, CreateAt) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        courseData.name,
        courseData.description,
        courseData.cost,
        courseData.categoryID,
        courseData.userID,
        new Date(),
      ],
      callback
    );
  },
  getAll: (callback) => {
    const sql = `SELECT * FROM Course`;
    db.query(sql, [], callback);
  },
};

export const db = { Course };
