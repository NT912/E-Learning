const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  user: 'lamnino', 
  password: 'Lam12345@', 
  server: 'lamnino.database.windows.net',
  database: 'E-LEARNING', 
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
