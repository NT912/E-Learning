import { Request, Response } from 'express';
import enrollmentService from '../services/enrollmentService';

class EnrollmentController {
  /**
   * Xử lý yêu cầu tạo bản ghi đăng ký mới cho khóa học.
   */
  async create(req: Request, res: Response): Promise<void> {
    const { courseID, userID } = req.body;

    try {
      const enrollmentID = await enrollmentService.createEnrollment(userID, courseID);
      res.status(201).json({ enrollmentID });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * Xử lý yêu cầu lấy thông tin bản ghi đăng ký dựa trên EnrollmentID.
   */
  async getById(req: Request, res: Response): Promise<void> {
    const enrollmentID = Number(req.params.enrollmentID);

    try {
      const enrollment = await enrollmentService.getEnrollmentById(enrollmentID);
      res.status(200).json(enrollment);
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: (err as Error).message });
    }
  }

  /**
   * Xử lý yêu cầu cập nhật trạng thái của bản ghi đăng ký.
   */
  async updateStatus(req: Request, res: Response): Promise<void> {
    const enrollmentID = req.params.enrollmentID;
    const { userID, status } = req.body;

    try {
      await enrollmentService.updateEnrollmentStatus(userID, parseInt(enrollmentID), status);
      res.status(200).json({ message: "Enrollment status updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * Xử lý yêu cầu xóa bản ghi đăng ký.
   */
  async delete(req: Request, res: Response): Promise<void> {
    const enrollmentID = req.params.enrollmentID;
    const { userID } = req.body;

    try {
      await enrollmentService.deleteEnrollment(userID, parseInt(enrollmentID));
      res.status(200).json({ message: "Enrollment deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: (err as Error).message });
    }
  }

  /**
   * Xử lý yêu cầu lấy tất cả các bản ghi đăng ký của một khóa học.
   */
  async getAllByCourse(req: Request, res: Response): Promise<void> {
    const courseID = Number(req.params.courseID);

    try {
      const enrollments = await enrollmentService.getEnrollmentsByCourseID(courseID);
      res.status(200).json(enrollments);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: (err as Error).message });
    }
  }
}

export default new EnrollmentController();
