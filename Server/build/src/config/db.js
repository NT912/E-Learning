"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;
var sql = require("mssql");
var dotenv = require("dotenv");
dotenv.config({
  path: ".env.dev"
});
var config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};
sql.connect(config).then(function (pool) {
  console.log("Connected to SQL Server!");
  return pool;
})["catch"](function (err) {
  console.error("Error connecting to SQL Server:", err);
});
var db = exports.db = {
  config: config
};