import db from "../../config/database/db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Lesson } from "../types/models";


const lessonModel = {
  /**
   * Tạo một bài học mới trong chương.
   * @param ChapterID - ID of the chapter the lesson belongs to.
   * @return Promise containing the ID of the newly created lesson.
   */
  createLesson: (ChapterID: number): Promise<number> => {
    const query = `
      INSERT INTO Lesson (ChapterID)
      VALUES (?);
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [ChapterID], (err: Error | null, result: OkPacket) => {
        if (err) {
          console.log(`Failed to create lesson: ${err}`);
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  },

  /**
   * Tìm bài học theo ID.
   * @param lessonID - ID của bài học.
   * @return Promise containing the lesson or null if not found.
   */
  findById: (lessonID: number): Promise<Lesson | null> => {
    const query = `SELECT * FROM Lesson WHERE LessonID = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [lessonID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.log(`Failed to find lesson by ID: ${err}`);
          return reject(err);
        }
        const lesson = results[0] as Lesson || null;
        resolve(lesson);
      });
    });
  },

  /**
   * Lấy danh sách các bài học theo ChapterID.
   * @param chapterID - ID của chương.
   * @return Promise containing the lessons in the chapter.
   */
  getLessonsByChapterID: (chapterID: number): Promise<Lesson[]> => {
    const query = `SELECT * FROM Lesson WHERE ChapterID = ?`;
    
    return new Promise((resolve, reject) => {
      db.query(query, [chapterID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) return reject("Error retrieving lessons");
        resolve(results as Lesson[]);
      });
    });
  },

  /**
   * Lấy danh sách các bài học theo nhiều ChapterID.
   * @param chapterIDs - Array of chapter IDs.
   * @return Promise containing the lessons in the specified chapters.
   */
  getLessonsByChapterIDs: (chapterIDs: number[]): Promise<Lesson[]> => {
    const placeholders = chapterIDs.map(() => '?').join(',');
    if (chapterIDs.length === 0) {
      return Promise.resolve([]); // Return empty array if no chapterIDs
    }
    const query = `SELECT * FROM Lesson WHERE ChapterID IN (${placeholders})`;
    
    return new Promise((resolve, reject) => {
      db.query(query, chapterIDs, (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.log(err);
          return reject("Failed to fetch lessons");
        }
        resolve(results as Lesson[]);
      });
    });
  },

  /**
   * Cập nhật bài học với các thông tin mới.
   * @param lessonID - ID của bài học.
   * @param title - New title of the lesson.
   * @param description - New description of the lesson.
   * @param fileLink - Link to the new file.
   * @param fileType - Type of the file.
   * @param duration - Duration of the lesson.
   * @return Promise<void>
   */
  updateLesson: (
    lessonID: number,
    title: string,
    description: string,
    fileLink: string,
    fileType: string,
    duration: number,
    link: string | null
  ): Promise<void> => {
    const query = `
      UPDATE Lesson
      SET Title = ?, Description = ?, FileLink = ?, Type = ?, Duration = ?, Link = ?
      WHERE LessonID = ?;
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [title, description, fileLink, fileType, duration, link, lessonID], (err: Error | null) => {
        if (err) {
          console.log(`Failed to update lesson: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Cập nhật trạng thái demo cho bài học.
   * @param lessonID - ID của bài học.
   * @param newState - New state of IsAllowDemo.
   * @return Promise<void>
   */
  updateLessonAllowDemo: (lessonID: number, newState: boolean): Promise<void> => {
    const query = `
      UPDATE Lesson
      SET IsAllowDemo = ?
      WHERE LessonID = ?;
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [newState, lessonID], (err: Error | null) => {
        if (err) {
          console.log(`Failed to update lesson demo state: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Xóa bài học theo ID.
   * @param lessonID - ID của bài học cần xóa.
   * @return Promise<void>
   */
  deleteLesson: (lessonID: number): Promise<void> => {
    const query = `
      DELETE FROM Lesson WHERE LessonID = ?;
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [lessonID], (err: Error | null) => {
        if (err) {
          console.log(`Failed to delete lesson: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  },
};

export default lessonModel;
