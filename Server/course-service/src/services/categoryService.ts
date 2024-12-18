import categoryModel from "../models/categoryModel";

const categoryService = {
  /**
   * Tạo một danh mục mới.
   * @param name - Tên của danh mục.
   * @param description - Mô tả của danh mục.
   * @return Promise<number> - ID của danh mục mới tạo.
   */
  createCategory: async (name: string, description: string): Promise<number> => {
    try {
      const categoryID = await categoryModel.createCategory(name, description);
      return categoryID;
    } catch (err: any) {
      throw new Error(`Failed to create category: ${err.message}`);
    }
  },

  /**
   * Cập nhật thông tin danh mục.
   * @param categoryID - ID của danh mục cần cập nhật.
   * @param name - Tên mới của danh mục.
   * @param description - Mô tả mới của danh mục.
   * @return Promise<void>
   */
  updateCategory: async (categoryID: number, name: string, description: string): Promise<void> => {
    try {
      const existingCategory = await categoryModel.getCategoryById(categoryID);
      if (!existingCategory) {
        throw new Error(`Category with ID ${categoryID} does not exist.`);
      }

      await categoryModel.updateCategory(categoryID, name, description);
    } catch (err: any) {
      throw new Error(`Failed to update category: ${err.message}`);
    }
  },

  /**
   * Xóa danh mục.
   * @param categoryID - ID của danh mục cần xóa.
   * @return Promise<void>
   */
  deleteCategory: async (categoryID: number): Promise<void> => {
    try {
      const existingCategory = await categoryModel.getCategoryById(categoryID);
      if (!existingCategory) {
        throw new Error(`Category with ID ${categoryID} does not exist.`);
      }

      await categoryModel.deleteCategory(categoryID);
    } catch (err: any) {
      throw new Error(`Failed to delete category: ${err.message}`);
    }
  },

  /**
   * Lấy tất cả danh mục.
   * @return Promise<any[]>
   */
  getAllCategories: async (): Promise<any[]> => {
    try {
      const categories = await categoryModel.getAllCategories();
      return categories;
    } catch (err: any) {
      throw new Error(`Failed to get categories: ${err.message}`);
    }
  },

   /**
   * Lấy thông tin chi tiết của một danh mục.
   * @param categoryID - ID của danh mục.
   * @return Promise<any>
   */
   getCategoryDetails: async (categoryID: number): Promise<any> => {
    try {
      const category = await categoryModel.getCategoryById(categoryID);
      if (!category) {
        throw new Error(`Category with ID ${categoryID} does not exist.`);
      }

      return category;
    } catch (err: any) {
      throw new Error(`Failed to get category details: ${err.message}`);
    }
  },
};

export default categoryService;
