const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.dev" });

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true, // Cần bật cho kết nối cục bộ (local)
  },
};

// Kết nối trực tiếp, không dùng pool
let connection;

const connectToDatabase = async () => {
  if (!connection) {
    try {
      connection = await sql.connect(config);
      console.log("Connected to SQL Server!");
    } catch (err) {
      console.error("Error connecting to SQL Server:", err.message);
      throw err;
    }
  }
  return connection;
};

// Tạo và trả về đối tượng request để thực hiện truy vấn
const sqlRequest = async () => {
  const connection = await connectToDatabase();
  return connection.request(); // Trả về đối tượng request để thực hiện truy vấn SQL
};

module.exports = {
  sqlRequest,
};
