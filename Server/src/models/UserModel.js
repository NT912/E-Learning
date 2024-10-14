const connection = require("~/config/db");

const User = {
  create: async (userData) => {
    try {
      const request = new sql.Request();
      const result = await request
        .input("Email", sql.NVarChar, userData.email)
        .input("HashPassword", sql.NVarChar, userData.password)
        .input("Role", sql.NVarChar, userData.role)
        .input("CreateAt", sql.DateTime, new Date())
        .query(
          `INSERT INTO Users (Email, HashPassword, Role, CreateAt)
          VALUES (@Email, @HashPassword, @Role, @CreateAt)`
        );
      return result;
    } catch (err) {
      console.log("SQL Error:", err);
      throw new Error("Error creating user");
    }
  },

  findByEmail: async (email) => {
    try {
      const request = new sql.Request();
      const result = await request
        .input("Email", sql.NVarChar, email)
        .query(`SELECT * FROM Users WHERE Email = @Email`);
      return result.recordset[0];
    } catch (err) {
      throw new Error("Error fetching user by email");
    }
  },

  /**
   * Tìm người dùng theo ID.
   * @param {Number} userID - ID của người dùng.
   * @return {Promise<Object|null>} - Promise chứa người dùng tìm được hoặc null nếu không tìm thấy.
   */
  findById: (userID) => {
    const query = `SELECT * FROM user WHERE UserID = ?`;

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
