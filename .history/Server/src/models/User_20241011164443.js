import { sqlRequest } from "~/config/db";

export const User = {
  create: async (userData) => {
    try {
      const request = await sqlRequest();
      const result = await request
        .input("Email", userData.email)
        .input("HashPassword", userData.password)
        .input("Role", userData.role)
        .input("CreateAt", new Date())
        .query(`INSERT INTO Users (Email, HashPassword, Role, CreateAt)
                VALUES (@Email, @HashPassword, @Role, @CreateAt)`);
      return result;
    } catch (err) {
      throw new Error("Error creating user: " + err.message);
    }
  },

  findByEmail: async (email) => {
    try {
      const request = await sqlRequest();
      const result = await request
        .input("Email", email)
        .query(`SELECT * FROM Users WHERE Email = @Email`);
      return result.recordset[0]; // Trả về bản ghi đầu tiên
    } catch (err) {
      throw new Error("Error fetching user: " + err.message);
    }
  },
};
