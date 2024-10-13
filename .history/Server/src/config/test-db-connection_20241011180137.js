const { sqlRequest } = require("./db");

const testDatabaseConnection = async () => {
  try {
    const request = await sqlRequest();
    // Chạy truy vấn đơn giản để kiểm tra
    const result = await request.query("SELECT 1 AS number");
    console.log("Test query result: ", result.recordset);
  } catch (err) {
    console.error("Error in test query: ", err.message); // Hiển thị thông báo lỗi chi tiết
  }
};

testDatabaseConnection();
