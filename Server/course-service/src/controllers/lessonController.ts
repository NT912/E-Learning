import { Request, Response } from 'express';
import lessonService from '../services/lessonService';

class LessonController {
  /**
   * Tạo một bài học mới.
   */
  async create(req: Request, res: Response): Promise<void> {
    const { userID, chapterID } = req.body;

    try {
      const result = await lessonService.createLesson(userID, parseInt(chapterID));
      res.status(201).json({ lessonID: result });
    } catch (err) {
      console.error("Error during lesson creation:", err);
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * Get details of a single lesson.
   */
  async getALesson(req: Request, res: Response): Promise<void> {
    const lessonID = Number(req.params);

    try {
      const lesson = await lessonService.getLessonDetails(lessonID);
      res.status(200).json(lesson);
    } catch (err) {
      console.error("Error fetching lesson details:", err);
      res.status(400).json({
        error: (err as Error).message || "An error occurred while fetching the lesson."
      });
    }
  }

  /**
   * Update a lesson.
   */
  async updateLesson(req: Request, res: Response): Promise<void> {
    const { lessonID } = req.params;
    const { title, description, userID, link } = req.body;
    const file = req.file;

    try {
      if (file) {
        const fileType = file.mimetype;
      }

      if ((!link && !file) || (link && file)) {
        throw new Error("Require either a link or a file, but not both.");
      }

      await lessonService.updateLesson(userID, Number(lessonID), title, description, file, link);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: (err as Error).message,
      });
    }
  }

  /**
   * Update the "Allow Demo" status of a lesson.
   */
  async updateLessonAllowDemo(req: Request, res: Response): Promise<void> {
    const { lessonID } = req.params;
    const { userID } = req.body;

    try {
      console.log()
      await lessonService.updateLessonAllowDemo(userID, Number(lessonID));
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: (err as Error).message
      });
    }
  }

  /**
   * Delete a lesson.
   */
  async delete(req: Request, res: Response): Promise<void> {
    const lessonID = Number(req.params);
    const { userID } = req.body;

    try {
      await lessonService.deleteLesson(userID, lessonID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: (err as Error).message
      });
    }
  }
}

export default new LessonController();