// src/controllers/progressController.ts
import { Request, Response } from "express";
import progressService from "../services/progressServices";

class ProgressController {
    /**
   * Xử lý yêu cầu thêm tiến trình mới cho một bài học.
   */
   async addProgress(req: Request, res: Response): Promise<void> {
    const { enrollmentID } = req.params;
    const { lessonID, UserID} = req.body;

    try {
      const progressID = await progressService.addProgress(parseInt(enrollmentID), lessonID, UserID);
      res.status(201).json(progressID);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * Xử lý yêu cầu cập nhật tiến trình của một bài học.
   */
  async updateProgress(req: Request, res: Response): Promise<void> {
    const enrollmentID = Number(req.params.enrollmentID);
    const lessonID = Number(req.params.lessonID);
    const { progressTime, isCompleted, attempts } = req.body;

    try {
      await progressService.updateProgress(enrollmentID, lessonID, progressTime, isCompleted, attempts);
      res.status(200).json({ message: "Progress updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * Lấy tiến trình của một bài học trong khóa học.
   */
  async getProgress(req: Request, res: Response): Promise<void> {
    const enrollmentID = Number(req.params.enrollmentID);
    const lessonID = Number(req.params.lessonID);

    try {
      const progress = await progressService.getProgress(enrollmentID, lessonID);
      res.status(200).json(progress);
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: (err as Error).message });
    }
  }
}

export default new ProgressController();
