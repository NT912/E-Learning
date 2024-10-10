const db = require("../config/db");

// Đăng ký khóa học
exports.enroll = (enrollmentData, callback) => {
  const query = `INSERT INTO Enrollments (user_id, course_id, progress, completed, enrolled_at)
                 VALUES (?, ?, 0, FALSE, NOW())`;

  const values = [enrollmentData.user_id, enrollmentData.course_id];

  db.query(query, values, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
