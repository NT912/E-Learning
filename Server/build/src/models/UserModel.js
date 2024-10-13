"use strict";

var sql = require("mssql");
var db = require("../config/db");
var User = {
  create: function create(userData, callback) {
    var sql = "INSERT INTO User (Email, HashPassword, Role, CreateAt) VALUES (?, ?, ?, ?)";
    db.query(sql, [userData.email, userData.password, userData.role, new Date()], callback);
  },
  findByEmail: function findByEmail(email, result) {
    var sql = "SELECT * FROM User WHERE Email = ?";
    db.query(sql, [email], callback);
  },
  // Ni cua Lam Be viet dung xoa nghe Nhat Truong
  findById: function findById(id, callback) {
    var query = "SELECT * FROM [User] WHERE UserID = @UserID";
    var request = new sql.Request();
    request.input("UserID", sql.Int, id);
    request.query(query, function (err, result) {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.recordset[0]);
    });
  }
};
module.exports = User;