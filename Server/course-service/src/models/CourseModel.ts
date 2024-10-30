import db from "../../config/database/db";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

interface Course {
  CourseID?: number;
  UserID: number;
  Name?: string;
  CreateAt?: Date;
  State?: string;
  PictureLink?: string;
  ShortCut?: string;
  Description?: string;
  Cost?: number;
}

const courseModel = {
  /**
   * Create a new course.
   * @param userID - The ID of the user creating the course.
   * @param createAt - The creation date of the course.
   * @return Promise<number> - The ID of the newly created course.
   */
  createCourse: (userID: number, createAt: Date): Promise<number> => {
    const query = `INSERT INTO Course (UserID, CreateAt) VALUES (?, ?);`;

    return new Promise((resolve, reject) => {
      db.query(query, [userID, createAt], (err: Error | null, result: ResultSetHeader) => {
        if (err) {
          console.log(`Model failed to create a course with UserID: ${err}`);
          return reject(new Error(message.course.creationError.failed));
        }
        resolve(result.insertId);
      });
    });
  },

  /**
   * Find a course by its name.
   * @param courseName - The name of the course to find.
   * @return Promise<Course | null> - The found course or null if not found.
   */
  findByName: (courseName: string): Promise<Course | null> => {
    const query = `SELECT * FROM course WHERE Name = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [courseName], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.log(`Model failed to find course: ${err}`);
          return reject(err);
        }
        const course = results[0] as Course || null;
        resolve(course);
      });
    });
  },

  /**
   * Find a course by its ID.
   * @param courseID - The ID of the course to find.
   * @return Promise<Course | null> - The found course or null if not found.
   */
  findById: (courseID: number): Promise<Course | null> => {
    const query = `SELECT * FROM course WHERE CourseID = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [courseID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.log(`Model failed to find course: ${err}`);
          return reject(err);
        }
        const course = results[0] as Course || null;
        resolve(course);
      });
    });
  },

  /**
   * Find a course by its associated lesson ID.
   * @param lessonID - The ID of the lesson to find the course for.
   * @return Promise<Course | null> - The found course or null if not found.
   */
  findCourseByLessonID: (lessonID: number): Promise<Course | null> => {
    const query = `
      SELECT c.* 
      FROM Course c
      JOIN Chapter ch ON c.CourseID = ch.CourseID
      JOIN Lesson l ON ch.ChapterID = l.ChapterID
      WHERE l.LessonID = ?;
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [lessonID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.log(`Failed to find course by lesson ID: ${err}`);
          return reject(err);
        }
        const course = results[0] as Course || null;
        resolve(course);
      });
    });
  },

  /**
   * Update the status of a course.
   * @param courseID - The ID of the course to update.
   * @param newStatus - The new status to set for the course.
   * @return Promise<void>
   */
  updateStatus: (courseID: number, newStatus: string): Promise<void> => {
    const query = `UPDATE Course SET State = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [newStatus, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Model failed to update status for CourseID: ${courseID}. Error: ${err}`);
          return reject(new Error(message.course.updateError.failed));
        }
        resolve();
      });
    });
  },

  /**
   * Update the avatar (image link) of a course.
   * @param courseID - The ID of the course to update.
   * @param linkFile - The new image link for the course avatar.
   * @return Promise<void>
   */
  updateAvatar: (courseID: number, linkFile: string): Promise<void> => {
    const query = `UPDATE Course SET PictureLink = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [linkFile, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Model failed to update avatar for CourseID: ${courseID}. Error: ${err}`);
          return reject(new Error(message.course.updateError.failed));
        }
        resolve();
      });
    });
  },

  /**
   * Update the shortcut of a course.
   * @param courseID - The ID of the course to update.
   * @param content - The new content for the course shortcut.
   * @return Promise<void>
   */
  updateShortcut: (courseID: number, content: string): Promise<void> => {
    const query = `UPDATE Course SET ShortCut = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [content, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Model failed to update shortcut for CourseID: ${courseID}. Error: ${err}`);
          return reject(new Error(message.course.updateError.failed));
        }
        resolve();
      });
    });
  },

  /**
   * Update the description of a course.
   * @param courseID - The ID of the course to update.
   * @param description - The new description for the course.
   * @return Promise<void>
   */
  updateDescription: (courseID: number, description: string): Promise<void> => {
    const query = `UPDATE Course SET Description = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [description, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Model failed to update description for CourseID: ${courseID}. Error: ${err}`);
          return reject(new Error(message.course.updateError.failed));
        }
        resolve();
      });
    });
  },

  /**
   * Update the cost of a course.
   * @param courseID - The ID of the course to update.
   * @param amount - The new cost amount for the course.
   * @return Promise<void>
   */
  updateCost: (courseID: number, amount: number): Promise<void> => {
    const query = `UPDATE Course SET Cost = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [amount, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Model failed to update cost for CourseID: ${courseID}. Error: ${err}`);
          return reject(new Error(message.course.updateError.failed));
        }
        resolve();
      });
    });
  },

  /**
   * Delete a course by its ID.
   * @param courseID - The ID of the course to delete.
   * @return Promise<void>
   */
  deleteCourse: (courseID: number): Promise<void> => {
    const query = `DELETE FROM Course WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [courseID], (err: Error | null) => {
        if (err) {
          console.error(`Failed to delete course with ID ${courseID}: ${err.message}`);
          return reject(new Error(message.course.deleteError.failed));
        }
        resolve();
      });
    });
  }
};

export default courseModel;
