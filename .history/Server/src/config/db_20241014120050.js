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
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_NAME);

    return;
  }
  console.log("Connected to MySQL!");
});

module.exports = connection;
