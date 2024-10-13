import sql from "mssql";
import dotenv from "dotenv";

dotenv.config({ path: ".env.dev" });

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Điều này phụ thuộc vào cấu hình SQL Server của bạn
    trustServerCertificate: true,
  },
};

let poolPromise;

export const connectToDatabase = async () => {
  if (!poolPromise) {
    try {
      poolPromise = await sql.connect(config);
      console.log("Connected to SQL Server!");
    } catch (err) {
      console.error("Error connecting to SQL Server:", err);
      throw err; // Nếu không thể kết nối, ném lỗi ra ngoài để xử lý
    }
  }
  return poolPromise;
};

export const sqlRequest = async () => {
  const pool = await connectToDatabase();
  return pool.request(); // Trả về đối tượng request để thực hiện các truy vấn
};
