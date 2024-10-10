const sql = require('mssql');
const db = require("../config/db");

const User = {
  create: (userData, callback) => {
    const sql = `INSERT INTO User (Email, HashPassword, Role, CreateAt) VALUES (?, ?, ?, ?)`;
    db.query(
      sql,
      [
        userData.email, 
        userData.password, 
        userData.role, 
        new Date()],
      callback
    );
  },

  findByEmail: (email, result) => {
    const sql = `SELECT * FROM User WHERE Email = ?`;
    db.query(sql, [email], callback);
  },

  // Ni cua Lam Be viet dung xoa nghe Nhat Truong
  findById: (id, callback) => {
    const query = `SELECT * FROM [User] WHERE UserID = @UserID`; 
  
    const request = new sql.Request();
    request.input('UserID', sql.Int, id);
  
    request.query(query, (err, result) => {
      if (err) {
        return callback(err, null); 
      }
      callback(null, result.recordset[0]); 
    });
  },
};

module.exports = User;
