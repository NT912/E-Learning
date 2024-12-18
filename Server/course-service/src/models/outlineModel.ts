import db from "../../config/database/db";
import { OkPacket, RowDataPacket } from "mysql2";

interface CourseOutcome {
  CourseOutcomeID?: number;
  CourseID: number;
  Content?: string;
}

const outlineModel = {
  /**
   * Tìm kiếm mục tiêu học tập theo ID.
   * @param courseOutcomeID - ID của mục tiêu học tập.
   * @return Promise chứa mục tiêu học tập hoặc null nếu không tìm thấy.
   */
  findById: (courseOutcomeID: number): Promise<CourseOutcome | null> => {
    const query = `SELECT * FROM courseoutcome WHERE CourseOutcomeID = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [courseOutcomeID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.error(`Failed to find learning outcome by ID: ${err}`);
          return reject(err);
        }
        const outcome = results[0] as CourseOutcome | null;
        resolve(outcome);
      });
    });
  },

  /**
   * Tìm kiếm mục tiêu học tập theo ID.
   * @param courseOutcomeID - ID của mục tiêu học tập.
   * @return Promise chứa mục tiêu học tập hoặc null nếu không tìm thấy.
   */
  findByCourseId: (courseOutcomeID: number): Promise<CourseOutcome[] | null> => {
    const query = `SELECT * FROM courseoutcome WHERE CourseID = ?`;

    return new Promise((resolve, reject) => {
      db.query(query, [courseOutcomeID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.error(`Failed to find learning outcome by ID: ${err}`);
          return reject(err);
        }
        const outcome = results as CourseOutcome[] | null;
        resolve(outcome);
      });
    });
  },

  /**
   * Thêm mục tiêu học tập mới cho khóa học.
   * @param courseID - ID của khóa học.
   * @return Promise chứa ID của mục tiêu học tập mới tạo.
   */
  addLearningOutcome: (courseID: number): Promise<number> => {
    const query = `
      INSERT INTO courseoutcome (CourseID)
      VALUES (?);
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [courseID], (err: Error | null, result: OkPacket) => {
        if (err) {
          console.error(`Failed to add learning outcome: ${err.message}`);
          return reject(err);
        }
        const outcomeID = result.insertId;
        resolve(outcomeID);
      });
    });
  },

  /**
   * Cập nhật mục tiêu học tập.
   * @param outcomeID - ID của mục tiêu học tập.
   * @param content - Nội dung mới của mục tiêu học tập.
   * @return Promise<void>
   */
  updateLearningOutcome: (outcomeID: number, content: string): Promise<void> => {
    const query = `
      UPDATE courseoutcome
      SET Content = ?
      WHERE CourseOutcomeID = ?;
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [content, outcomeID], (err: Error | null) => {
        if (err) {
          console.error(`Failed to update learning outcome: ${err.message}`);
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Xóa mục tiêu học tập theo ID.
   * @param outcomeID - ID của mục tiêu học tập cần xóa.
   * @return Promise<void>
   */
  deleteLearningOutcome: (outcomeID: number): Promise<void> => {
    const query = `
      DELETE FROM courseoutcome
      WHERE CourseOutcomeID = ?;
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [outcomeID], (err: Error | null) => {
        if (err) {
          console.error(`Failed to delete learning outcome: ${err.message}`);
          return reject(err);
        }
        resolve();
      });
    });
  }
};

export default outlineModel;
