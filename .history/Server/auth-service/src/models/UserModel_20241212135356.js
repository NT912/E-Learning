const connection = require("../../config/database/db");

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
};

module.exports = User;
