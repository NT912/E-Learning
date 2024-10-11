const db = require("../config/db");

// Tạo bài học mới
exports.create = (lessonData, callback) => {
  const query = `INSERT INTO Lessons (course_id, title, content, is_downloadable, created_at, updated_at)
                 VALUES (?, ?, ?, ?, NOW(), NOW())`;

  const values = [
    lessonData.course_id,
    lessonData.title,
    lessonData.content,
    lessonData.is_downloadable,
  ];

  db.query(query, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
