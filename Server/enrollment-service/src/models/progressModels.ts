// src/models/progressModel.ts
import { RowDataPacket, ResultSetHeader } from "mysql2";
import connection from "../../config/database/db";

interface Progress {
  ProgressID?: number;
  EnrollmentID: number;
  LessonID: number;
  ProgressTime: number;
  IsCompleted: boolean;
  CompletionDate?: Date;
  Attempts: number;
  LastAccessedAt?: Date;
}

const ProgressModel = {
    /**
     * Thêm một tiến trình mới cho bài học.
     * @param enrollmentID - ID của bản ghi đăng ký.
     * @param lessonID - ID của bài học.
     * @param progressTime - Thời gian ban đầu.
     */
    addNewProgress: (enrollmentID: number, lessonID: number): Promise<number> => {
        const query = `
        INSERT INTO progress (EnrollmentID, LessonID, ProgressTime, LastAccessedAt)
        VALUES (?, ?, ?, 0, CURRENT_TIMESTAMP)
        `;

        return new Promise((resolve, reject) => {
        connection.query(query, [enrollmentID, lessonID], (err: Error | null, results: ResultSetHeader) => {
            if (err) {
            return reject(err);
            }
            resolve(results.insertId);
        });
        });
    },

    /**
     * Tìm tiến trình dựa trên EnrollmentID và LessonID.
     * @param enrollmentID - ID của bản ghi đăng ký.
     * @param lessonID - ID của bài học.
     * @return Promise<Progress | null>
     */
    findByEnrollmentAndLesson: (enrollmentID: number, lessonID: number): Promise<Progress | null> => {
        const query = `SELECT * FROM progress WHERE EnrollmentID = ? AND LessonID = ?`;
        return new Promise((resolve, reject) => {
        connection.query(query, [enrollmentID, lessonID], (err: Error | null, results: RowDataPacket[]) => {
            if (err) {
            return reject(err);
            }
            const enrollment = results[0] as Progress;
            resolve(enrollment || null);
        });
        });
    },

    /**
     * Cập nhật tiến trình học của một bài học.
     * @param enrollmentID - ID của bản ghi đăng ký.
     * @param lessonID - ID của bài học.
     * @param progressTime - Thời gian học.
     * @param isCompleted - Trạng thái hoàn thành.
     * @param attempts - Số lần học.
     * @return Promise<void>
     */
    updateProgress: (
        enrollmentID: number,
        lessonID: number,
        progressTime: number,
        isCompleted: boolean,
        attempts: number
    ): Promise<void> => {
        const query = `
        UPDATE progress
        SET ProgressTime = ?, IsCompleted = ?, Attempts = ?, LastAccessedAt = CURRENT_TIMESTAMP, 
            CompletionDate = CASE WHEN ? = TRUE THEN CURRENT_TIMESTAMP ELSE NULL END
        WHERE EnrollmentID = ? AND LessonID = ?`;

        return new Promise((resolve, reject) => {
        connection.query(
            query,
            [progressTime, isCompleted, attempts, isCompleted, enrollmentID, lessonID],
            (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
            }
        );
        });
    },

  
};

export default ProgressModel;
