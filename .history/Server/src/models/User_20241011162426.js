import sql from "mssql";
import { db } from "~/config/db";

export const User = {
  create: async (userData) => {
    const pool = await sql.connect(db.config);
    const result = await pool
      .request()
      .input("Email", sql.VarChar, userData.email)
      .input("HashPassword", sql.VarChar, userData.password)
      .input("Role", sql.VarChar, userData.role)
      .input("CreateAt", sql.DateTime, new Date())
      .query(
        `INSERT INTO Users (Email, HashPassword, Role, CreateAt)
         OUTPUT INSERTED.*
         VALUES (@Email, @HashPassword, @Role, @CreateAt)`
      );
    return result.recordset[0];
  },

  findByEmail: async (email) => {
    const pool = await sql.connect(db.config);
    const result = await pool
      .request()
      .input("Email", sql.VarChar, email)
      .query(`SELECT * FROM Users WHERE Email = @Email`);
    return result.recordset[0];
  },
};
