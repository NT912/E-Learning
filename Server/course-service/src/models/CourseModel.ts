import db from "../../config/database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Course } from "../types/models";

const courseModel = {
  /**
   * Create a new course.
   * @param userID - The ID of the user creating the course.
   * @param createAt - The creation date of the course.
   * @returns Promise<number> - The ID of the newly created course.
   */
  createCourse: (userID: number, createAt: Date): Promise<number> => {
    const query = `INSERT INTO Course (UserID, CreateAt) VALUES (?, ?);`;

    return new Promise((resolve, reject) => {
      db.query(query, [userID, createAt], (err: Error | null, result: ResultSetHeader) => {
        if (err) {
          console.log(`Failed to create a course with UserID: ${err}`);
          return reject("Failed to create the course.");
        }
        resolve(result.insertId);
      });
    });
  },

  /**
   * Find a course by its name.
   * @param courseName - The name of the course to find.
   * @returns Promise<Course | null> - The found course or null if not found.
   */
  findByName: (courseName: string): Promise<Course | null> => {
    const query = `SELECT * FROM course WHERE Name = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [courseName], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.log(`Failed to find course: ${err}`);
          return reject("Error finding course by name.");
        }
        const course = results[0] as Course || null;
        resolve(course);
      });
    });
  },

  /**
   * Find a course by its ID.
   * @param courseID - The ID of the course to find.
   * @returns Promise<Course | null> - The found course or null if not found.
   */
  findById: (courseID: number): Promise<Course | null> => {
    const query = `SELECT * FROM course WHERE CourseID = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [courseID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.log(`Failed to find course by ID: ${err}`);
          return reject("Error finding course by ID.");
        }
        const course = results[0] as Course || null;
        resolve(course);
      });
    });
  },

  /**
   * Find a course by its associated chapter ID.
   * @param chapterID - The ID of the chapter to find the course for.
   * @returns Promise<Course | null> - The found course or null if not found.
   */
  findCourseByChapterID: (chapterID: number): Promise<Course | null> => {
    const query = `
      SELECT c.* 
      FROM Course c
      JOIN Chapter ch ON c.CourseID = ch.CourseID
      WHERE ch.ChapterID = ?;
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [chapterID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.log(`Failed to find course by chapter ID: ${err}`);
          return reject("Error finding course by chapter ID.");
        }
        const course = results[0] as Course || null;
        resolve(course);
      });
    });
  },

  /**
   * Find a course by its associated lesson ID.
   * @param lessonID - The ID of the lesson to find the course for.
   * @returns Promise<Course | null> - The found course or null if not found.
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
          return reject("Error finding course by lesson ID.");
        }
        const course = results[0] as Course || null;
        resolve(course);
      });
    });
  },

  getFilteredCourses: (
    category: string | null,
    free: boolean | null,
    minPrice: number | null,
    maxPrice: number | null,
    offset: number,
    limit: number
  ): Promise<Course[]> => {
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (category) {
      conditions.push("category = ?");
      params.push(category);
    }

    if (free !== null) {
      conditions.push("cost = ?");
      params.push(free ? 0 : minPrice!); // free khóa học có cost là 0
    } else {
      if (minPrice !== null) {
        conditions.push("cost >= ?");
        params.push(minPrice);
      }
      if (maxPrice !== null) {
        conditions.push("cost <= ?");
        params.push(maxPrice);
      }
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT name, avatar, cost FROM course ${whereClause} LIMIT ?, ?`;
    
    params.push(offset, limit);

    return new Promise((resolve, reject) => {
      db.query(query, params, (err, results: RowDataPacket[]) => {
        if (err) {
          console.error("Error fetching filtered courses:", err);
          return reject("Failed to fetch courses.");
        }
        resolve(results as Course[]);
      });
    });
  },

  /**
  * Update the name of a course.
  * @param courseID - The ID of the course to update.
  * @param newName - The new name for the course.
  * @returns Promise<void>
  */
  updateName: (courseID: number, newName: string): Promise<void> => {
    const query = `UPDATE Course SET Name = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [newName, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Failed to update name for CourseID: ${courseID}. Error: ${err}`);
          return reject("Failed to update course name.");
        }
        resolve();
      });
    });
  },

  /**
   * Update the status of a course.
   * @param courseID - The ID of the course to update.
   * @param newStatus - The new status to set for the course.
   * @returns Promise<void>
   */
  updateStatus: (courseID: number, newStatus: string): Promise<void> => {
    const query = `UPDATE Course SET State = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [newStatus, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Failed to update status for CourseID: ${courseID}. Error: ${err}`);
          return reject("Failed to update course status.");
        }
        resolve();
      });
    });
  },

  /**
   * Update the avatar (image link) of a course.
   * @param courseID - The ID of the course to update.
   * @param linkFile - The new image link for the course avatar.
   * @returns Promise<void>
   */
  updateAvatar: (courseID: number, linkFile: string): Promise<void> => {
    const query = `UPDATE Course SET PictureLink = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [linkFile, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Failed to update avatar for CourseID: ${courseID}. Error: ${err}`);
          return reject("Failed to update course avatar.");
        }
        resolve();
      });
    });
  },

  /**
   * Update the shortcut of a course.
   * @param courseID - The ID of the course to update.
   * @param content - The new content for the course shortcut.
   * @returns Promise<void>
   */
  updateShortcut: (courseID: number, content: string): Promise<void> => {
    const query = `UPDATE Course SET ShortCut = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [content, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Failed to update shortcut for CourseID: ${courseID}. Error: ${err}`);
          return reject("Failed to update course shortcut.");
        }
        resolve();
      });
    });
  },

  /**
   * Update the description of a course.
   * @param courseID - The ID of the course to update.
   * @param description - The new description for the course.
   * @returns Promise<void>
   */
  updateDescription: (courseID: number, description: string): Promise<void> => {
    const query = `UPDATE Course SET Description = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [description, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Failed to update description for CourseID: ${courseID}. Error: ${err}`);
          return reject("Failed to update course description.");
        }
        resolve();
      });
    });
  },

  /**
   * Update the cost of a course.
   * @param courseID - The ID of the course to update.
   * @param amount - The new cost amount for the course.
   * @returns Promise<void>
   */
  updateCost: (courseID: number, amount: number): Promise<void> => {
    const query = `UPDATE Course SET Cost = ? WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [amount, courseID], (err: Error | null) => {
        if (err) {
          console.log(`Failed to update cost for CourseID: ${courseID}. Error: ${err}`);
          return reject("Failed to update course cost.");
        }
        resolve();
      });
    });
  },

  /**
   * Delete a course by its ID.
   * @param courseID - The ID of the course to delete.
   * @returns Promise<void>
   */
  deleteCourse: (courseID: number): Promise<void> => {
    const query = `DELETE FROM Course WHERE CourseID = ?;`;

    return new Promise((resolve, reject) => {
      db.query(query, [courseID], (err: Error | null) => {
        if (err) {
          console.error(`Failed to delete course with ID ${courseID}: ${err.message}`);
          return reject("Failed to delete course.");
        }
        resolve();
      });
    });
  }
};

export default courseModel;
