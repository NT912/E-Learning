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
    trustServerCertificate: true,
  },
};

let poolPromise;

const connectToDatabase = async () => {
  if (!poolPromise) {
    try {
      poolPromise = sql.connect(config);
      await poolPromise; // Đảm bảo kết nối thành công
      console.log("Connected to SQL Server!");
    } catch (err) {
      console.error("Error connecting to SQL Server:", err.message);
      throw err;
    }
  }
  return poolPromise;
};

const sqlRequest = async () => {
  const pool = await connectToDatabase();
  if (!pool) {
    throw new Error("Failed to connect to the database pool");
  }
  return pool.request();
};

module.exports = {
  connectToDatabase,
  sqlRequest,
};
