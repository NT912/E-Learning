const connection = require("~/config/db");

const User = {
  create: async (userData) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO user (Email, HashPassword, Role, CreateAt) VALUES (?, ?, ?, ?)`;

      connection.query(
        query,
        [userData.email, userData.password, userData.role, new Date()],
        (err, result) => {
          if (err) {
            console.log("SQL Error:", err);
            reject(new Error("Error creating user"));
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  findByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE Email = ?`;

      connection.query(query, [email], (err, results) => {
        if (err) {
          reject(new Error("Error fetching user by email"));
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  // Lam Be viet dung xoa nha
  findById: (UserID, callback) => {
    const query = `SELECT * FROM user WHERE UserID = ?`;

    connection.query(query, UserID, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      const course = results[0];
      callback(null, course);
    });
  },
};

module.exports = User;
