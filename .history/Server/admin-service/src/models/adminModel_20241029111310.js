const connection = require("../config/database");

const AdminModel = {
  getAllUsers: () => {
    const query = `SELECT UserID, Email, Role, CreateAt FROM user`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) reject(new Error("Error fetching users"));
        resolve(results);
      });
    });
  },

  getUserById: (userID) => {
    const query = `SELECT UserID, Email, Role, CreateAt FROM user WHERE UserID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [userID], (err, results) => {
        if (err) reject(new Error("Error fetching user by ID"));
        resolve(results[0]);
      });
    });
  },

  updateUserRole: (userID, newRole) => {
    const query = `UPDATE user SET Role = ? WHERE UserID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [newRole, userID], (err, results) => {
        if (err) reject(new Error("Error updating user role"));
        resolve(results);
      });
    });
  },

  deleteUser: (userID) => {
    const query = `DELETE FROM user WHERE UserID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [userID], (err, results) => {
        if (err) reject(new Error("Error deleting user"));
        resolve(results);
      });
    });
  },
};

module.exports = AdminModel;
