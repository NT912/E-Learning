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
          `INSERT INTO user (Email, HashPassword, Role, CreateAt)
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
        .query(`SELECT * FROM user WHERE Email = @Email`);
      return result.recordset[0];
    } catch (err) {
      throw new Error("Error fetching user by email");
    }
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
