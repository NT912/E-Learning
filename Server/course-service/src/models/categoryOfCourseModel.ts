import connection from "../../config/database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface CategoryOfCourse {
  CourseID: number;
  CategoryID: number;
}

const categoryOfCourseModel = {
  /**
   * Thêm một liên kết giữa khóa học và danh mục.
   * @param courseID - ID của khóa học.
   * @param categoryID - ID của danh mục.
   * @returns Promise<number> - ID của liên kết vừa được tạo.
   */
  addCategoryToCourse: (courseID: number, categoryID: number): Promise<number> => {
    const query = `INSERT INTO categoryofcourse (CourseID, CategoryID) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      connection.query(query, [courseID, categoryID], (err: Error | null, result: ResultSetHeader) => {
        if (err) {
          return reject("Failed to add category to course.");
        }
        resolve(result.insertId);
      });
    });
  },

  /**
   * Xóa liên kết giữa khóa học và danh mục.
   * @param courseID - ID của khóa học.
   * @param categoryID - ID của danh mục.
   * @returns Promise<void>
   */
  removeCategoryFromCourse: (courseID: number, categoryID: number): Promise<void> => {
    const query = `DELETE FROM categoryofcourse WHERE CourseID = ? AND CategoryID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [courseID, categoryID], (err: Error | null) => {
        if (err) {
          return reject("Failed to remove category from course.");
        }
        resolve();
      });
    });
  },

  /**
   * Lấy tất cả các danh mục thuộc về một khóa học.
   * @param courseID - ID của khóa học.
   * @returns Promise<CategoryOfCourse[]> - Danh sách tất cả các danh mục của khóa học.
   */
  getCategoriesOfCourse: (courseID: number): Promise<CategoryOfCourse[]> => {
    const query = `SELECT * FROM categoryofcourse WHERE CourseID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [courseID], (err: Error | null, results: RowDataPacket[]) => {
        if (err) {
          return reject("Failed to retrieve categories for course.");
        }
        resolve(results as CategoryOfCourse[]);
      });
    });
  }
};

export default categoryOfCourseModel;
