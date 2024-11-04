import connection from "../../config/database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Enrollment } from "../types/models/Enrollment";
import EnrollmentStatus from '../../config/data/EnrolmentStatus';


const enrollmentModel = {
  /**
   * Thêm một bản ghi đăng ký mới.
   * @param userID - ID của người dùng.
   * @param courseID - ID của khóa học.
   * @param startDate - Ngày bắt đầu khóa học.
   * @return Promise<number> - ID của bản ghi đăng ký mới tạo.
   */
  createEnrollment: (userID: number, courseID: number, status: EnrollmentStatus): Promise<number> => {
    const query = `INSERT INTO enrollment (UserID, CourseID, StartDate, Status) VALUES (?, ?, ?, ?)`;
    const startDate: Date = new Date();
    return new Promise((resolve, reject) => {
      connection.query(query, [userID, courseID, startDate, status], (err: Error | null, result: ResultSetHeader) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId); 
      });
    });
  },

  /**
   * Cập nhật trạng thái của bản ghi đăng ký.
   * @param enrollmentID - ID của bản ghi đăng ký cần cập nhật.
   * @param status - Trạng thái mới của bản ghi đăng ký.
   * @return Promise<void>
   */
  updateEnrollmentStatus: (enrollmentID: number, status: EnrollmentStatus): Promise<void> => {
    const query = `UPDATE enrollment SET Status = ? WHERE EnrollmentID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [status, enrollmentID], (err: Error | null) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
 * Cập nhật chi phí của bản ghi đăng ký.
 * @param enrollmentID - ID của bản ghi đăng ký cần cập nhật.
 * @param cost - Chi phí mới.
 * @return Promise<void>
 */
  updateEnrollmentCost: (enrollmentID: number, cost: number): Promise<void> => {
    const query = `UPDATE enrollment SET Cost = ? WHERE EnrollmentID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [cost, enrollmentID], (err: Error | null) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Xóa một bản ghi đăng ký.
   * @param enrollmentID - ID của bản ghi đăng ký cần xóa.
   * @return Promise<void>
   */
  deleteEnrollment: (enrollmentID: number): Promise<void> => {
    const query = `DELETE FROM enrollment WHERE EnrollmentID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [enrollmentID], (err: Error | null) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Tìm bản ghi đăng ký theo ID.
   * @param enrollmentID - ID của bản ghi đăng ký cần tìm.
   * @return Promise<Enrollment | null> - Bản ghi đăng ký hoặc null nếu không tìm thấy.
   */
  findById: (enrollmentID: number): Promise<Enrollment | null> => {
    const query = `SELECT * FROM enrollment WHERE EnrollmentID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [enrollmentID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          return reject(err);
        }
        const enrollment = results[0] as Enrollment;
        resolve(enrollment);
      });
    });
  },

  /**
   * Lấy tất cả các bản ghi đăng ký của một khóa học.
   * @param courseID - ID của khóa học.
   * @return Promise<Enrollment[]> - Danh sách tất cả các bản ghi đăng ký cho khóa học.
   */
  getEnrollmentsByCourseID: (courseID: number): Promise<Enrollment[]> => {
    const query = `SELECT * FROM enrollment WHERE CourseID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [courseID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          return reject(err);
        }
        const enrollments = results as Enrollment[] 
        resolve(enrollments);
      });
    });
  },

  /**
   * Lấy tất cả các bản ghi đăng ký của một người dùng.
   * @param userID - ID của người dùng.
   * @return Promise<Enrollment[]> - Danh sách tất cả các bản ghi đăng ký cho người dùng.
   */
  getEnrollmentsByUserID: (userID: number): Promise<Enrollment[]> => {
    const query = `SELECT * FROM enrollment WHERE UserID = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [userID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          return reject(err);
        }
        const enrollments = results as Enrollment[] 
        resolve(enrollments);
      });
    });
  },

  /**
   * Cập nhật rating và review cho bản ghi đăng ký.
   * @param enrollmentID - ID của bản ghi đăng ký.
   * @param rating - Giá trị đánh giá.
   * @param review - Nội dung đánh giá tùy chọn.
   * @return Promise<void>
   */
  updateRatingAndReview: (enrollmentID: number, rating: number, review: string | ''): Promise<void> => {
    const query = `UPDATE enrollment SET Rating = ?, Review = ? WHERE EnrollmentID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [rating, review, enrollmentID], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },
};

export default enrollmentModel;
