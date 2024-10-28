const categoryService = require("../../services/course/categoryService");

const CategoryController = {
  /**
   * Tạo một danh mục mới.
   */
  create: async (req, res) => {
    const { name, description } = req.body;
    
    try {
      const categoryID = await categoryService.createCategory(name, description);
      res.status(201).json({ message: "Category created successfully", categoryID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Cập nhật danh mục.
   */
  update: async (req, res) => {
    const { categoryID } = req.params;
    const { name, description } = req.body;
    
    try {
      await categoryService.updateCategory(categoryID, name, description);
      res.status(200).json({ message: "Category updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Xóa danh mục.
   */
  delete: async (req, res) => {
    const { categoryID } = req.params;
    
    try {
      await categoryService.deleteCategory(categoryID);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Lấy tất cả danh mục.
   */
  getAll: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = CategoryController;
