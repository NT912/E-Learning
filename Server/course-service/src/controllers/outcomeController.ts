import { Request, Response } from 'express';
import outlineService from '../services/outlineService';

class OutcomeController {
  /**
   * Xử lý yêu cầu tạo mục tiêu học tập mới cho khóa học.
   */
  async create(req: Request, res: Response): Promise<void> {
    const { courseID } = req.params;
    const { userID } = req.body;

    try {
      const result = await outlineService.createOutline(userID, courseID);
      res.status(201).json({ outComeID: result });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * Xử lý yêu cầu cập nhật mục tiêu học tập.
   */
  async update(req: Request, res: Response): Promise<void> {
    const { content, userID } = req.body;
    const { outcomeID } = req.params;

    try {
      await outlineService.updateOutline(userID, outcomeID, content);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * Xử lý yêu cầu xóa mục tiêu học tập.
   */
  async delete(req: Request, res: Response): Promise<void> {
    const { outcomeID } = req.params;
    const { userID } = req.body;

    try {
      await outlineService.deleteOutline(userID, outcomeID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }
}

export default new OutcomeController();
