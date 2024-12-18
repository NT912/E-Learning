import connection from "../../config/database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Chapter } from "../types/models";

const ChapterModel = {
  /**
   * Tạo một chapter mới cho khóa học.
   * @param courseID - ID của khóa học.
   * @return Promise<number> - ID của chapter mới tạo.
   */
  createChapter: (courseID: number): Promise<number> => {
    const query = `
      INSERT INTO chapter (CourseID)
      VALUES (?);
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [courseID], (err: Error | null, result: ResultSetHeader) => {
        if (err) {
          console.error(`Fail to create chapter with CourseID: ${err}`);
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  },

  /**
   * Tìm chapter theo ID.
   * @param chapterID - ID của chapter.
   * @return Promise<Chapter | null> - Chapter hoặc null nếu không tìm thấy.
   */
  findById: (chapterID: number): Promise<Chapter | null> => {
    const query = `SELECT * FROM chapter WHERE ChapterID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [chapterID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.error(`Fail to find chapter by ID: ${err}`);
          return reject(err);
        }
        const chapter = results[0] as Chapter | null;
        resolve(chapter);
      });
    });
  },

  /**
   * Lấy các chapter theo courseID.
   * @param courseID - ID của khóa học.
   * @return Promise<Chapter[]> - Danh sách các chapter.
   */
  getChaptersByCourseID: (courseID: number): Promise<Chapter[]> => {
    const query = `SELECT * FROM chapter WHERE CourseID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [courseID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.error("Error retrieving chapters:", err);
          return reject(err);
        }
        resolve(results as Chapter[]);
      });
    });
  },

  /**
   * Cập nhật tiêu đề của chapter.
   * @param chapterID - ID của chapter.
   * @param title - Tiêu đề mới của chapter.
   * @return Promise<void>
   */
  updateTitle: (chapterID: number, title: string, description: string): Promise<void> => {
    const query = `
      UPDATE chapter
      SET Title = ?, Description = ?
      WHERE ChapterID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [title, description, chapterID], (err: Error | null) => {
        if (err) {
          console.error(`Fail to update chapter title: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Xóa chapter theo ID.
   * @param chapterID - ID của chapter cần xóa.
   * @return Promise<void>
   */
  deleteChapter: (chapterID: number): Promise<void> => {
    const query = `
      DELETE FROM chapter WHERE ChapterID = ?;
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [chapterID], (err: Error | null) => {
        if (err) {
          console.error(`Fail to delete chapter: ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  }
};

export default ChapterModel;
