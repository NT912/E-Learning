import connection from "../../config/database/db";
import { ResultSetHeader } from "mysql2";

interface Category {
  CategoryID: number;
  Name: string;
  Description: string;
}

const categoryModel = {
  /**
   * Thêm một danh mục mới.
   * @param name - Tên của danh mục.
   * @param description - Mô tả của danh mục.
   * @return Promise<number> - ID của danh mục mới tạo.
   */
  createCategory: (name: string, description: string): Promise<number> => {
    const query = `INSERT INTO category (Name, Description) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      connection.query(query, [name, description], (err: Error | null, result: ResultSetHeader) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId); // Trả về ID của danh mục vừa tạo
      });
    });
  },

  /**
   * Cập nhật thông tin của danh mục.
   * @param categoryID - ID của danh mục cần cập nhật.
   * @param name - Tên mới của danh mục.
   * @param description - Mô tả mới của danh mục.
   * @return Promise<void>
   */
  updateCategory: (categoryID: number, name: string, description: string): Promise<void> => {
    const query = `UPDATE category SET Name = ?, Description = ? WHERE CategoryID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [name, description, categoryID], (err: Error | null) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Xóa một danh mục.
   * @param categoryID - ID của danh mục cần xóa.
   * @return Promise<void>
   */
  deleteCategory: (categoryID: number): Promise<void> => {
    const query = `DELETE FROM category WHERE CategoryID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [categoryID], (err: Error | null) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Lấy tất cả các danh mục.
   * @return Promise<Category[]> - Danh sách tất cả các danh mục.
   */
  getAllCategories: (): Promise<Category[]> => {
    const query = `SELECT * FROM category`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err: Error | null, results: Category[]) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
};

export default categoryModel;
