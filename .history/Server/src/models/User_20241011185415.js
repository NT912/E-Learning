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
      console.log("Email being searched:", email); // Log email
      const result = await request
        .input("Email", sql.NVarChar, email)
        .query(`SELECT * FROM [Users] WHERE Email = @Email`);

      // Log kết quả truy vấn
      console.log("SQL Query Result:", result);

      // Kiểm tra nếu không tìm thấy kết quả
      if (result.recordset && result.recordset.length > 0) {
        // Nếu có kết quả, trả về người dùng
        return result.recordset[0];
      } else {
        console.log("No user found for email:", email);
        throw new Error("User not found");
      }
    } catch (err) {
      console.error("SQL Error:", err); // Log chi tiết lỗi
      throw new Error("Error fetching user by email");
    }
  },
};
