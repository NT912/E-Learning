const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const config = {
<<<<<<< HEAD:Server/config/db.js
  user: 'lamnino', 
  password: 'Lam12345@', 
  server: 'lamnino.database.windows.net',
  database: 'E-LEARNING', 
=======
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
>>>>>>> d114be5b68a42872a3c5702ec111c07455281597:Server/.history/config/db_20241010232025.js
  options: {
    encrypt: true,
    trustServerCertificate: false,
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

<<<<<<< HEAD:Server/config/db.js
module.exports = sql;
=======
export const db = {
  connection,
};
>>>>>>> d114be5b68a42872a3c5702ec111c07455281597:Server/.history/config/db_20241010232025.js
