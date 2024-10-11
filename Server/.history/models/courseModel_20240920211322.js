const db = require("../config/db");

// Tạo khóa học mới
exports.create = (courseData, callback) => {
  const query = `INSERT INTO Courses (user_id, title, description, category_id, price, created_at, updated_at, status)
                 VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 'pending')`;

  const values = [
    courseData.user_id,
    courseData.title,
    courseData.description,
    courseData.category_id,
    courseData.price,
  ];

  db.query(query, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Lấy danh sách khóa học
exports.getAll = (callback) => {
  const query = `SELECT * FROM Courses`;

  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
