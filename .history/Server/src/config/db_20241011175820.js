const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.dev" });

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Điều này cần bật nếu SQL Server của bạn yêu cầu
    trustServerCertificate: true, // Cần bật nếu bạn đang kết nối đến SQL Server cục bộ
  },
};

let poolPromise;

export const connectToDatabase = async () => {
  if (!poolPromise) {
    try {
      poolPromise = sql.connect(config);
      await poolPromise; // Đợi kết nối được khởi tạo thành công
      console.log("Connected to SQL Server!");
    } catch (err) {
      console.error("Error connecting to SQL Server:", err.message); // Hiển thị lỗi chi tiết
      throw err;
    }
  }
  return poolPromise;
};

export const db = async () => {
  const pool = await connectToDatabase();
  if (!pool) {
    throw new Error("Failed to connect to the database pool");
  }
  return pool.request();
};
