const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.dev" });

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
  connection.release();
});

module.exports = connection;
