import { Request, Response } from 'express';
import courseDependService from '../services/courseDependService';

class CourseDependController {
  /**
   * Thêm phụ thuộc cho khóa học
   */
  async addCourseDepend(req: Request, res: Response): Promise<void> {
    const { courseID } = req.params;
    const { dependOnCourseID, isRequire, userID } = req.body;

    try {
      await courseDependService.addCourseDepend(userID, parseInt(courseID), dependOnCourseID, isRequire);
      res.status(201).json({ message: "Dependency added to course successfully" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * Xóa phụ thuộc khỏi khóa học
   */
  async removeCourseDepend(req: Request, res: Response): Promise<void> {
    const { courseID, dependOnCourseID } = req.params;
    const { userID } = req.body;

    try {
      await courseDependService.removeCourseDepend(userID, parseInt(courseID), parseInt(dependOnCourseID));
      res.status(200).json({ message: "Dependency removed from course successfully" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  /**
   * Lấy danh sách phụ thuộc của một khóa học
   */
  async getCourseDependencies(req: Request, res: Response): Promise<void> {
    const { courseID } = (req.params);

    try {
      const dependencies = await courseDependService.getCourseDependencies(parseInt(courseID));
      res.status(200).json(dependencies);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}

export default new CourseDependController();
