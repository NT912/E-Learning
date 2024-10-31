import db from "../../config/database/db";
import { OkPacket, RowDataPacket } from "mysql2";

interface CourseDependency {
  CourseDependID?: number;
  CourseID: number;
  DependOnCourseID: number;
  IsRequire: boolean;
}

const courseDependModel = {
  /**
   * Thêm một phụ thuộc khóa học.
   * @param courseID - ID của khóa học cần yêu cầu khóa học khác.
   * @param dependOnCourseID - ID của khóa học cần hoàn thành trước.
   * @param isRequire - Điều kiện bắt buộc.
   * @return Promise<void>
   */
  addCourseDepend: (courseID: number, dependOnCourseID: number, isRequire: boolean): Promise<void> => {
    const query = `
      INSERT INTO coursedepend (CourseID, DependOnCourseID, IsRequire)
      VALUES (?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [courseID, dependOnCourseID, isRequire], (err: Error | null) => {
        if (err) {
          console.error(`Failed to add course dependency: ${err.message}`);
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Xóa một phụ thuộc khóa học.
   * @param courseID - ID của khóa học.
   * @param dependOnCourseID - ID của khóa học cần hoàn thành trước.
   * @return Promise<void>
   */
  removeCourseDepend: (courseID: number, dependOnCourseID: number): Promise<void> => {
    const query = `
      DELETE FROM coursedepend
      WHERE CourseID = ? AND DependOnCourseID = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [courseID, dependOnCourseID], (err: Error | null) => {
        if (err) {
          console.error(`Failed to remove course dependency: ${err.message}`);
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Lấy danh sách phụ thuộc của một khóa học.
   * @param courseID - ID của khóa học.
   * @return Promise<CourseDependency[]> - Danh sách phụ thuộc của khóa học.
   */
  getCourseDependencies: (courseID: number): Promise<CourseDependency[]> => {
    const query = `
      SELECT cd.CourseDependID, cd.CourseID, cd.DependOnCourseID, cd.IsRequire, c.Name AS DependCourseName
      FROM coursedepend AS cd
      JOIN course AS c ON cd.DependOnCourseID = c.CourseID
      WHERE cd.CourseID = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [courseID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          console.error(`Failed to retrieve course dependencies: ${err.message}`);
          return reject(err);
        }
        const dependencies = results as CourseDependency[];
        resolve(dependencies);
      });
    });
  }
};

export default courseDependModel;
