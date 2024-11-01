import EnrollmentModel from '../models/enrollmentModels';
import { Enrollment } from '../types/models/Enrollment';

const enrollmentService = {
  /**
   * Tạo một bản ghi đăng ký mới cho một khóa học.
   * @param userID - ID của người dùng yêu cầu đăng ký.
   * @param courseID - ID của khóa học mà người dùng muốn đăng ký.
   * @return Promise<number> - ID của bản ghi đăng ký mới tạo hoặc lỗi.
   */
  createEnrollment: async (userID: number, courseID: number): Promise<number> => {
    const enrollmentID = await EnrollmentModel.createEnrollment(userID, courseID);
    return enrollmentID;
  },

  /**
   * Cập nhật trạng thái của bản ghi đăng ký.
   * @param userID - ID của người dùng yêu cầu cập nhật.
   * @param enrollmentID - ID của bản ghi đăng ký cần cập nhật.
   * @param status - Trạng thái mới của bản ghi đăng ký.
   * @return Promise<void>
   */
  updateEnrollmentStatus: async (userID: number, enrollmentID: number, status: 'active' | 'completed' | 'cancelled' | 'suspended'): Promise<void> => {
    const enrollment = await EnrollmentModel.findById(enrollmentID);

    if (!enrollment) throw new Error("Enrollment not found.");
    if (enrollment.UserID !== userID) throw new Error("You do not have permission to update this enrollment.");

    await EnrollmentModel.updateEnrollmentStatus(enrollmentID, status);
  },

  /**
   * Xóa một bản ghi đăng ký.
   * @param userID - ID của người dùng yêu cầu xóa.
   * @param enrollmentID - ID của bản ghi đăng ký cần xóa.
   * @return Promise<void>
   */
  deleteEnrollment: async (userID: number, enrollmentID: number): Promise<void> => {
    const enrollment = await EnrollmentModel.findById(enrollmentID);

    if (!enrollment) throw new Error("Enrollment not found.");
    if (enrollment.UserID !== userID) throw new Error("You do not have permission to delete this enrollment.");

    await EnrollmentModel.deleteEnrollment(enrollmentID);
  },

  /**
   * Lấy danh sách tất cả bản ghi đăng ký của một khóa học.
   * @param courseID - ID của khóa học.
   * @return Promise<Enrollment[]> - Danh sách bản ghi đăng ký của khóa học.
   */
  getEnrollmentsByCourseID: async (courseID: number): Promise<Enrollment[]> => {
    return await EnrollmentModel.getEnrollmentsByCourseID(courseID);
  },

  /**
   * Lấy danh sách tất cả bản ghi đăng ký của một người dùng.
   * @param userID - ID của người dùng.
   * @return Promise<Enrollment[]> - Danh sách bản ghi đăng ký của người dùng.
   */
  getEnrollmentsByUserID: async (userID: number): Promise<Enrollment[]> => {
    return await EnrollmentModel.getEnrollmentsByUserID(userID);
  },

   /**
   * Lấy thông tin bản ghi đăng ký dựa trên EnrollmentID.
   * @param enrollmentID - ID của bản ghi đăng ký.
   * @returns Promise<Enrollment> - Trả về thông tin của bản ghi đăng ký nếu tìm thấy.
   */
  getEnrollmentById: async(enrollmentID: number): Promise<Enrollment> => {
    try {
      const enrollment = await EnrollmentModel.findById(enrollmentID);
      if (!enrollment) {
        throw new Error("Enrollment not found.");
      }
      return enrollment;
    } catch (error) {
      throw error;
    }
  }
};

export default enrollmentService;
