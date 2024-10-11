const db = require("../config/db");

const User = {
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
};

module.exports = User;
