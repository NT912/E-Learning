const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.dev" });

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let poolPromise;

const connectToDatabase = async () => {
  if (!poolPromise) {
    try {
      poolPromise = await sql.connect(config);
      console.log("Connected to SQL Server!");
    } catch (err) {
      console.error("Error connecting to SQL Server:", err);
    }
  }
  return poolPromise;
};

export { connectToDatabase, sql };
