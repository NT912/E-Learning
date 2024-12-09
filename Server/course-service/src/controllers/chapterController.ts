import { Request, Response } from 'express';
import chapterService from '../services/chapterService';

class ChapterController {
  /**
   * Xử lý yêu cầu tạo chapter mới cho khóa học.
   */
  async create(req: Request, res: Response): Promise<void> {
    const { userID, courseID } = req.body;

    try {
      const result = await chapterService.createChapter(userID, Number(courseID));
      res.status(201).json({
        chapterID: result,
      });
    } catch (err) {
      console.error(err); // Ghi lại lỗi để kiểm tra
      res.status(400).json({
        error: (err as Error).message,
      });
    }
  }

  /**
   * Xử lý yêu cầu cập nhật tên chapter.
   */
  async updateChapterName(req: Request, res: Response): Promise<void> {
    const { title, userID, description } = req.body;
    const { chapterID } = req.params;

    try {
      await chapterService.updateChapterName(userID, Number(chapterID), title, description);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: (err as Error).message,
      });
    }
  }

  /**
   * Xử lý yêu cầu xóa chapter.
   */
  async deleteChapter(req: Request, res: Response): Promise<void> {
    const { chapterID } = req.params;
    const userID = req.body.userID; // Lấy `userID` từ `req.body` hoặc `req.user`
    try {
      await chapterService.deleteChapter(userID, Number(chapterID));
      res.status(200).json();
    } catch (err) {
      console.log(err)
      res.status(400).json({
        error: (err as Error).message,
      });
    }
  }

  /**
   * Lấy thông tin chapter theo ID.
   */
  async getChapter(req: Request, res: Response): Promise<void> {
    const { chapterID } = req.params;

    try {
      const chapter = await chapterService.getChapter(Number(chapterID));
      if (!chapter) {
        res.status(404).json({ error: "Chapter not found" });
        return;
      }
      res.status(200).json(chapter);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * Lấy tất cả các chapter của một khóa học.
   */
  async getChapters(req: Request, res: Response): Promise<void> {
    const { courseID } = req.params;

    try {
      const chapters = await chapterService.getChaptersByCourse(Number(courseID));
      res.status(200).json(chapters);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: (err as Error).message });
    }
  }
}

export default new ChapterController();
