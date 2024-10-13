import { connectToDatabase } from "~/config/db";

export const User = {
  create: async (userData) => {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("Email", userData.email)
      .input("HashPassword", userData.password)
      .input("Role", userData.role)
      .input("CreateAt", new Date())
      .query(
        `INSERT INTO Users (Email, HashPassword, Role, CreateAt)
         VALUES (@Email, @HashPassword, @Role, @CreateAt)`
      );
    return result;
  },

  findByEmail: async (email) => {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("Email", email)
      .query(`SELECT * FROM Users WHERE Email = @Email`);
    return result.recordset[0];
  },
};
