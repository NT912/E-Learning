import { pool } from "~/config/db";

export const User = {
  create: async (userData, callback) => {
    try {
      const result = await pool
        .request()
        .input("Email", userData.email)
        .input("HashPassword", userData.password)
        .input("Role", userData.role)
        .input("CreateAt", new Date())
        .query(`INSERT INTO Users (Email, HashPassword, Role, CreateAt)
                VALUES (@Email, @HashPassword, @Role, @CreateAt)`);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },

  findByEmail: async (email, callback) => {
    try {
      const result = await pool
        .request()
        .input("Email", email)
        .query(`SELECT * FROM Users WHERE Email = @Email`);
      callback(null, result.recordset[0]);
    } catch (err) {
      callback(err);
    }
  },
};
