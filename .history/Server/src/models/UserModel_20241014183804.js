const connection = require("~/config/db");

const User = {
  create: async (userData) => {
    return new Promise((resolve, reject) => {
      const query = INSERT INTO user (Email, HashPassword, Role, CreateAt) VALUES (?, ?, ?, ?);

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
      const query = SELECT * FROM user WHERE Email = ?;

      connection.query(query, [email], (err, results) => {
        if (err) {
          reject(new Error("Error fetching user by email"));
        } else if (results.length === 0) {
          resolve(null); // Không có người dùng với email này
        } else {
          resolve(results[0]); // Trả về người dùng nếu có email này
        }
      });
    });
  },

  /**
   * Tìm người dùng theo ID.
   * @param {Number} userID - ID của người dùng.
   * @return {Promise<Object|null>} - Promise chứa người dùng tìm được hoặc null nếu không tìm thấy.
   */
  findById: (userID) => {
    const query = SELECT * FROM user WHERE UserID = ?;

    return new Promise((resolve, reject) => {
      connection.query(query, [userID], (err, results) => {
        if (err) {
          return reject(err); // Ném lỗi ra ngoài nếu có lỗi xảy ra
        }
        const user = results[0] || null; // Trả về người dùng tìm được hoặc null
        resolve(user);
      });
    });
  },
};
module.exports = User;
