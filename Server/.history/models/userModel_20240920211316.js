const db = require("../config/db");

// Tạo người dùng mới
exports.create = (userData, callback) => {
  const query = `INSERT INTO Users (email, password_hash, role, full_name, phone_number, avatar, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;

  const values = [
    userData.email,
    userData.password_hash,
    userData.role,
    userData.full_name,
    userData.phone_number,
    userData.avatar,
  ];

  db.query(query, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Tìm người dùng theo email
exports.findByEmail = (email, callback) => {
  const query = `SELECT * FROM Users WHERE email = ?`;

  db.query(query, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
