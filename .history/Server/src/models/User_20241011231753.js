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
      console.log("SQL Error:", err);
      throw new Error("Error creating user");
    }
  },

  findByEmail: async (email) => {
    try {
      const request = new sql.Request();
      const result = await request
        .input("Email", sql.NVarChar, email)
        .query(`SELECT * FROM [Users] WHERE Email = @Email`);

      // Kiểm tra xem recordset có dữ liệu không
      if (result.recordset.length === 0) {
        return null; // Nếu không có user nào, trả về null
      }

      return result.recordset[0]; // Trả về user đầu tiên
    } catch (err) {
      console.error("SQL Error:", err);
      throw new Error("Error fetching user by email");
    }
  },
};
