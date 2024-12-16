const connection = require("../../config/database/db");

const User = {
  getUserProfile: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE UserID = ?`;
      connection.query(query, [userId], (err, result) => {
        if (err) {
          console.log("SQL Error:", err);
          reject(new Error("Error fetching user profile"));
        } else {
          resolve(result[0] || {});
        }
      });
    });
  },

  updateUserProfile: (userId, updates) => {
    const setClause = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updates), userId];

    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET ${setClause} WHERE UserID = ?`;
      connection.query(query, values, (err, result) => {
        if (err) {
          console.log("SQL Error:", err);
          reject(new Error("Error updating user profile"));
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = User;
