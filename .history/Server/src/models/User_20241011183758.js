import sql from "mssql";
import { db } from "~/config/db";

export const User = {
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
      onsole.error("SQL Error:", err); // Log chi tiết thông tin lỗi
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
};
