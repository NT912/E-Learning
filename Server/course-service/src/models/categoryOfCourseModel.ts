import connection from "../../config/database/db"
import { ResultSetHeader } from "mysql2";

interface CategoryOfCourse {
  CourseID: number;
  CategoryID: number;
}

const categoryOfCourseModel = {
  /**
   * Thêm một liên kết giữa khóa học và danh mục.
   * @param courseID - ID của khóa học.
   * @param categoryID - ID của danh mục.
   * @return Promise<number> - ID của liên kết vừa được tạo.
   */
  addCategoryToCourse: (courseID: number, categoryID: number): Promise<number> => {
    const query = `INSERT INTO categoryofcourse (CourseID, CategoryID) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      connection.query(query, [courseID, categoryID], (err: Error | null, result: ResultSetHeader) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId); // Trả về ID của liên kết vừa tạo
      });
    });
  },

  /**
   * Xóa liên kết giữa khóa học và danh mục.
   * @param courseID - ID của khóa học.
   * @param categoryID - ID của danh mục.
   * @return Promise<void>
   */
  removeCategoryFromCourse: (courseID: number, categoryID: number): Promise<void> => {
    const query = `DELETE FROM categoryofcourse WHERE CourseID = ? AND CategoryID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [courseID, categoryID], (err: Error | null) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Lấy tất cả các danh mục thuộc về một khóa học.
   * @param courseID - ID của khóa học.
   * @return Promise<CategoryOfCourse[]> - Danh sách tất cả các danh mục của khóa học.
   */
  getCategoriesOfCourse: (courseID: number): Promise<CategoryOfCourse[]> => {
    const query = `SELECT * FROM categoryofcourse WHERE CourseID = ?`;
    return new Promise((resolve, reject) => {
      // connection.query(query, [courseID], (err: Error | null, results: CategoryOfCourse[]) => {
      //   if (err) {
      //     return reject(err);
      //   }
      //   resolve(results);
      // });
    });
  }
};

export default categoryOfCourseModel;
