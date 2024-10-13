import { connectToDatabase } from "~/config/db";

export const User = {
  create: async (userData) => {
    const query = `
        INSERT INTO Course (UserID, CreateAt)
        VALUES (@UserID, @CreateAt);
        SELECT SCOPE_IDENTITY() AS CourseID;
    `;
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
