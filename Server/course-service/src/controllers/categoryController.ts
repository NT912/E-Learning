import { Request, Response } from 'express';
import categoryService from '../services/categoryService';

class CategoryController {
  /**
   * Tạo một danh mục mới.
   */
  async create(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;
    
    try {
      const categoryID = await categoryService.createCategory(name, description);
      res.status(201).json({ message: "Category created successfully", categoryID });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * Cập nhật danh mục.
   */
  async update(req: Request, res: Response): Promise<void> {
    const { categoryID } = req.params;
    const { name, description } = req.body;
    
    try {
      await categoryService.updateCategory(Number(categoryID), name, description);
      res.status(200).json({ message: "Category updated successfully" });
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: (err as Error).message });
    }
  }

  /**
   * Xóa danh mục.
   */
  async delete(req: Request, res: Response): Promise<void> {
    const { categoryID } = req.params;
    
    try {
      await categoryService.deleteCategory(Number(categoryID));
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * Lấy tất cả danh mục.
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      console.log("hhere");
      const categories = await categoryService.getAllCategories();
      console.log(categories);
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * Lấy tất cả danh mục.
   */
  async getCategoryDetail(req: Request, res: Response): Promise<void> {
    try {
      const { categoryID } = req.params;

      const categories = await categoryService.getCategoryDetails(Number(categoryID));
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: (err as Error).message });
    }
  }
}

export default new CategoryController();
