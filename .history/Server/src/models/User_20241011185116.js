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

      // Kiểm tra kết quả trả về
      if (!result || !result.recordset || result.recordset.length === 0) {
        throw new Error("User not found");
      }

      return result.recordset[0];
    } catch (err) {
      console.error("SQL Error:", err);  // Log thông tin lỗi từ SQL Server
      throw new Error("Error fetching user by email");
    }
  },
};
Kiểm tra lại trên Postman:
Kiểm tra kỹ email bạn đang gửi khi thực hiện yêu cầu POST /auth/login và đảm bảo email đó tồn tại trong cơ sở dữ liệu.
Ví dụ, trên Postman, body của yêu cầu nên trông như thế này:

json
Copy code
{
  "email": "test@example.com",
  "password": "yourpassword"
}
Sau khi thực hiện các bước này, nếu vẫn gặp lỗi, hãy cung cấp thêm chi tiết log từ console.log trong truy vấn SQL để tôi có thể hỗ trợ bạn tiếp.









};
