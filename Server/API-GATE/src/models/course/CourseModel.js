const connection = require("../../../config/database/db");
const message = require("../../../config/message.json");

const courseModel = {
  /**
   * Create a new course.
   * @param {Number} userID - The ID of the user creating the course.
   * @param {Date} createAt - The creation date of the course.
   * @return {Promise<Number>} - Promise that contains the ID of the newly created course.
   */
  createCourse: (userID, createAt) => {
    const query = `
      INSERT INTO Course (UserID, CreateAt)
      VALUES (?, ?);
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [userID, createAt], (err, result) => {
        if (err) {
          console.log(`Model failed to create a course with UserID: ${err}`);
          return reject(message.course.creationError.failed);
        }
        const courseID = result.insertId;
        resolve(courseID);
      });
    });
  },

  /**
   * Find a course by its name.
   * @param {String} courseName - The name of the course to find.
   * @return {Promise<Object|null>} - Promise that contains the found course or null if not found.
   */
  findByName: (courseName) => {
    const query = `SELECT * FROM course WHERE Name = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [courseName], (err, results) => {
        if (err) {
          console.log(`Model failed to find course: ${err}`);
          return reject(err);
        }
        const course = results[0] || null;
        resolve(course);
      });
    });
  },

  /**
   * Find a course by its ID.
   * @param {Number} courseID - The ID of the course to find.
   * @return {Promise<Object|null>} - Promise that contains the found course or null if not found.
   */
  findById: (courseID) => {
    const query = `SELECT * FROM course WHERE CourseID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, courseID, (err, results) => {
        if (err) {
          console.log(`Model failed to find course: ${err}`);
          return reject(err);
        }
        const course = results[0] || null;
        resolve(course);
      });
    });
  },

  /**
   * Find the course by chapter ID.
   * @param {Number} chapterID - The ID of the chapter.
   * @return {Promise<Object|null>} - Promise containing the course information or null if not found.
   */
  findCourseByChapterID: (chapterID) => {
    const query = `
      SELECT c.*
      FROM Course c
      JOIN Chapter ch ON c.CourseID = ch.CourseID
      WHERE ch.ChapterID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [chapterID], (err, results) => {
        if (err) {
          console.log(`Failed to find course by chapter ID: ${err}`);
          return reject(err);
        }
        const course = results[0] || null;  
        resolve(course);
      });
    });
  },

  /**
   * Find the course by lesson ID.
   * @param {Number} lessonID - The ID of the lesson.
   * @return {Promise<Object|null>} - Promise containing the course information or null if not found.
   */
  findCourseByLessonID: (lessonID) => {
    const query = `
      SELECT c.*
      FROM Course c
      JOIN Chapter ch ON c.CourseID = ch.CourseID
      JOIN Lesson l ON ch.ChapterID = l.ChapterID
      WHERE l.LessonID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [lessonID], (err, results) => {
        if (err) {
          console.log(`Failed to find course by lesson ID: ${err}`);
          return reject(err);
        }
        const course = results[0] || null;  
        resolve(course);
      });
    });
  },

  /**
   * Update the name of a course.
   * @param {Number} courseID - The ID of the course to update.
   * @param {String} name - The new name of the course.
   * @return {Promise<void>} - Promise that resolves when the name is updated.
   */
  updateName: (courseID, name) => {
    const query = `
      UPDATE Course
      SET Name = ?
      WHERE CourseID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [name, courseID], (err) => {
        if (err) {
          console.log(`Failed to update course name: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Update the status of a course.
   * @param {Number} courseID - The ID of the course to update.
   * @param {CourseState} newStatus - The new status of the course.
   * @return {Promise<void>} - Promise that resolves when the status is updated.
   */
  updateStatus: (courseID, newStatus) => {
    const query = `
      UPDATE Course
      SET State = ?
      WHERE CourseID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [newStatus, courseID], (err) => {
        if (err) {
          console.log(`Model failed to update status for CourseID: ${courseID}. Error: ${err}`);
          return reject(message.course.updateError.description.failed);
        }
        resolve();
      });
    });
  },

  /**
   * Update the avatar (image link) of a course.
   * @param {Number} courseID - The ID of the course to update.
   * @param {String} linkFile - The new link for the course avatar.
   * @return {Promise<void>} - Promise that resolves when the avatar is updated.
   */
  updateAvatar: (courseID, linkFile) => {
    const query = `
      UPDATE Course
      SET PictureLink = ?
      WHERE CourseID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [linkFile, courseID], (err) => {
        if (err) {
          console.log(`Model failed to update avatar for CourseID: ${courseID}. Error: ${err}`);
          return reject(message.course.updateError.description.failed);
        }
        resolve();
      });
    });
  },

  /**
   * Update the shortcut (summary or brief description) of a course.
   * @param {Number} courseID - The ID of the course to update.
   * @param {String} content - The new content for the course shortcut.
   * @return {Promise<void>} - Promise that resolves when the shortcut is updated.
   */
  updateShortcut: (courseID, content) => {
    const query = `
      UPDATE Course
      SET ShortCut = ?
      WHERE CourseID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [content, courseID], (err) => {
        if (err) {
          console.log(`Model failed to update shortcut for CourseID: ${courseID}. Error: ${err}`);
          return reject(message.course.updateError.description.failed);
        }
        resolve();
      });
    });
  },

  /**
   * Update the description of a course.
   * @param {Number} courseID - The ID of the course to update.
   * @param {String} description - The new description for the course.
   * @return {Promise<void>} - Promise that resolves when the description is updated.
   */
  updateDescription: (courseID, description) => {
    const query = `
      UPDATE Course
      SET Description = ?
      WHERE CourseID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [description, courseID], (err) => {
        if (err) {
          console.log(`Model failed to update description for CourseID: ${courseID}. Error: ${err}`);
          return reject(message.course.updateError.description.failed);
        }
        resolve();
      });
    });
  },

  /**
   * Update the description of a course.
   * @param {Number} courseID - The ID of the course to update.
   * @param {String} description - The new description for the course.
   * @return {Promise<void>} - Promise that resolves when the description is updated.
   */
  updateCost: (courseID, amount) => {
    const query = `
      UPDATE Course
      SET Cost = ?
      WHERE CourseID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [amount, courseID], (err) => {
        if (err) {
          console.log(`Model failed to update description for CourseID: ${courseID}. Error: ${err}`);
          return reject(message.course.updateError.description.failed);
        }
        resolve();
      });
    });
  },
};

module.exports = courseModel;
