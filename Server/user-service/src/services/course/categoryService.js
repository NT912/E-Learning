const categoryModel = require("../../models/course/categoryModel");

const categoryService = {
  /**
   * Tạo một danh mục mới.
   * @param {String} name - Tên của danh mục.
   * @param {String} description - Mô tả của danh mục.
   * @return {Promise<Number>} - ID của danh mục mới tạo.
   */
  createCategory: async (name, description) => {
    try {
      const categoryID = await categoryModel.createCategory(name, description);
      return categoryID;
    } catch (err) {
      throw new Error(`Failed to create category: ${err.message}`);
    }
  },

  /**
   * Cập nhật thông tin danh mục.
   * @param {Number} categoryID - ID của danh mục cần cập nhật.
   * @param {String} name - Tên mới của danh mục.
   * @param {String} description - Mô tả mới của danh mục.
   * @return {Promise<void>}
   */
  updateCategory: async (categoryID, name, description) => {
    try {
      await categoryModel.updateCategory(categoryID, name, description);
    } catch (err) {
      throw new Error(`Failed to update category: ${err.message}`);
    }
  },

  /**
   * Xóa danh mục.
   * @param {Number} categoryID - ID của danh mục cần xóa.
   * @return {Promise<void>}
   */
  deleteCategory: async (categoryID) => {
    try {
      await categoryModel.deleteCategory(categoryID);
    } catch (err) {
      throw new Error(`Failed to delete category: ${err.message}`);
    }
  },

  /**
   * Lấy tất cả danh mục.
   * @return {Promise<Array>}
   */
  getAllCategories: async () => {
    try {
      const categories = await categoryModel.getAllCategories();
      return categories;
    } catch (err) {
      throw new Error(`Failed to get categories: ${err.message}`);
    }
  }
};

module.exports = categoryService;
