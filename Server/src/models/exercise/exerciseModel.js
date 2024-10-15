const connection = require("../../config/db");

const Exercise = {
  createExercise: (lessonId, title, description, language) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO exercise (LessonID, Title, Description, Language, CreateAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`;
      connection.query(
        query,
        [lessonId, title, description, language],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  submitExercise: (
    exerciseId,
    userId,
    code,
    language,
    output,
    score,
    status
  ) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO exercise_submission (ExerciseID, UserID, Code, Language, Output, Score, Status, SubmittedAt) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`;
      connection.query(
        query,
        [exerciseId, userId, code, language, output, score, status],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  getExerciseById: (exerciseId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM exercise WHERE ExerciseID = ?`;
      connection.query(query, [exerciseId], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
};

module.exports = Exercise;
