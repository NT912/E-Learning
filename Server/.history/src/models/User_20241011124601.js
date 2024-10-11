import { db } from "../config/db";

const User = async (req, res) => {
  create: (userData, callback) => {
    const sql = `INSERT INTO User (Email, HashPassword, Role, CreateAt) VALUES (?, ?, ?, ?)`;
    db.query(
      sql,
      [userData.email, userData.password, userData.role, new Date()],
      callback
    );
  },
  findByEmail: (email, callback) => {
    const sql = `SELECT * FROM User WHERE Email = ?`;
    db.query(sql, [email], callback);
  },
  findById: (id, callback) => {
    const sql = `SELECT * FROM User WHERE UserID = ?`;
    db.query(sql, [id], callback);
  },
};

export const User = {
  User,
};
