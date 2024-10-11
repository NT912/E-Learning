import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.dev.DB_USER,
  password: process.env.dev.DB_PASSWORD,
  server: process.env.dev.DB_HOST,
  database: process.env.dev.DB_NAME,
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
