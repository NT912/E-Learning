import { Request, Response } from 'express';
import categoryOfCourseService from '../services/categoryOfCourseService';

class CategoryOfCourseController {
  /**
   * Thêm danh mục vào khóa học.
   */
  async addCategoriesToCourse(req: Request, res: Response): Promise<void> {
    const { courseID } = req.params;
    const { categoryIDs, userID } = req.body; // Mảng chứa các categoryID và userID của người dùng

    try {
      await categoryOfCourseService.addCategoriesToCourse(userID, Number(courseID), categoryIDs);
      res.status(201).json({ message: "Categories added to course successfully" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * Xóa danh mục khỏi khóa học.
   */
  async removeCategoryFromCourse(req: Request, res: Response): Promise<void> {
    const { courseID, categoryID } = req.params;
    const { userID } = req.body; // Nhận userID từ body để kiểm tra quyền

    try {
      await categoryOfCourseService.removeCategoryFromCourse(userID, Number(courseID), Number(categoryID));
      res.status(200).json({ message: "Category removed from course successfully" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * Lấy tất cả danh mục của một khóa học.
   */
  async getCategoriesOfCourse(req: Request, res: Response): Promise<void> {
    const { courseID } = req.params;
    const { userID } = req.body; // Nhận userID từ body để kiểm tra quyền

    try {
      const categories = await categoryOfCourseService.getCategoriesOfCourse(Number(courseID));
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}

export default new CategoryOfCourseController();
