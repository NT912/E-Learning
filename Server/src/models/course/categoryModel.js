const connection = require("../../../config/database/db");

const categoryModel = {
  /**
   * Thêm một danh mục mới.
   * @param {String} name - Tên của danh mục.
   * @param {String} description - Mô tả của danh mục.
   * @return {Promise<Number>} - ID của danh mục mới tạo.
   */
  createCategory: (name, description) => {
    const query = `INSERT INTO category (Name, Description) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      connection.query(query, [name, description], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId); // Trả về ID của danh mục vừa tạo
      });
    });
  },

  /**
   * Cập nhật thông tin của danh mục.
   * @param {Number} categoryID - ID của danh mục cần cập nhật.
   * @param {String} name - Tên mới của danh mục.
   * @param {String} description - Mô tả mới của danh mục.
   * @return {Promise<void>}
   */
  updateCategory: (categoryID, name, description) => {
    const query = `UPDATE category SET Name = ?, Description = ? WHERE CategoryID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [name, description, categoryID], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Xóa một danh mục.
   * @param {Number} categoryID - ID của danh mục cần xóa.
   * @return {Promise<void>}
   */
  deleteCategory: (categoryID) => {
    const query = `DELETE FROM category WHERE CategoryID = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, [categoryID], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  /**
   * Lấy tất cả các danh mục.
   * @return {Promise<Array>} - Danh sách tất cả các danh mục.
   */
  getAllCategories: () => {
    const query = `SELECT * FROM category`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
};

module.exports = categoryModel;
