import { Request, Response } from 'express';
import courseService from '../services/courseService';
import { CourseStatus } from '../../config/data/courseStatus'

class CourseController {
  async createCourse(req: Request, res: Response): Promise<void> {
    const { userID } = req.body;

    try {
      const result = await courseService.create(Number(userID));
      res.status(201).json({ courseID: result });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async getCourseDetails(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);
    const userID = Number(req.query.userID);

    try {
      const courseDetails = await courseService.getCourseDetails(courseID, userID);
      res.status(200).json(courseDetails);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateCourseName(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);
    const { userID, courseName: name } = req.body;

    try {
      await courseService.updateCourseName(Number(userID), courseID, name);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async updateCourseAvatar(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);
    const { userID } = req.body;
    const file = req.file;

    try {
      // Check if file is defined
      if (!file) {
        res.status(400).json({ error: "File is required for updating course avatar." });
        return;
      }

      await courseService.updateCourseAvatar(Number(userID), courseID, file);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
}


  async updateCourseShortcut(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);
    const { userID, content } = req.body;

    try {
      await courseService.updateCourseShortcut(Number(userID), courseID, content);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async updateCourseDescription(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);
    const { userID, content } = req.body;

    try {
      await courseService.updateCourseDescription(Number(userID), courseID, content);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async updateCourseCost(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);
    const { userID, amount } = req.body;

    try {
      await courseService.updateCourseCost(Number(userID), courseID, Number(amount));
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async confirm(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);
    const { userID } = req.body;

    try {
      await courseService.confirmCourse(userID, courseID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async updateState(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);
    const { state } = req.query as { state?: string };

    try {
      if (!state || !Object.values(CourseStatus).includes(state as typeof CourseStatus[keyof typeof CourseStatus])) {
        res.status(400).json({ error: "Invalid course status" });
        return
      }

      await courseService.updateCourseStatus(courseID, state as typeof CourseStatus[keyof typeof CourseStatus]);
      res.status(200).json({ message: `Course status updated to ${state}` });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async deleteCourse(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);
    const userID = Number(req.query.userID);

    try {
      await courseService.deleteCourse(userID, courseID);
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }
}

export default new CourseController();
