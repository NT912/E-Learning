const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  server: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  options: {
    encrypt: true, 
    trustServerCertificate: false 
  }
};

sql.connect(config)
  .then(pool => {
    console.log("Connected to SQL Server!");
    return pool;
  })
  .catch(err => {
    console.error("Error connecting to SQL Server:", err);
  });


module.exports = sql;
