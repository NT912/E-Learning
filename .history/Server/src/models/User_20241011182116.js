import { connectToDatabase } from "~/config/db";

export const User = {
  create: async (userData) => {
    const query = `
        INSERT INTO Course (UserID, CreateAt)
        VALUES (@UserID, @CreateAt);
        SELECT SCOPE_IDENTITY() AS CourseID;
    `;

    const request = new sql.Request();
    request.input("UserID", sql.Int, params[0]);
    request.input("CreateAt", sql.DateTime, params[1]);

    request.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const insertedId = result.recordset[0].CourseID;
      callback(null, insertedId);
    });
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
