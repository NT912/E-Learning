import sql from "mssql";
import dotenv from "dotenv";

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

sql
  .connect(config)
  .then((pool) => {
    console.log("Connected to SQL Server!");
    return pool;
  })
  .catch((err) => {
    console.error("Error connecting to SQL Server:", err);
  });

export const db = {
  config,
};
