import EnrollmentModel from '../models/enrollmentModels';
import { Enrollment } from '../types/models/Enrollment';
import EnrollmentStatus from '../../config/data/EnrolmentStatus';

const enrollmentService = {
  /**
   * Tạo một bản ghi đăng ký mới cho một khóa học.
   * @param userID - ID của người dùng yêu cầu đăng ký.
   * @param courseID - ID của khóa học mà người dùng muốn đăng ký.
   * @return Promise<number> - ID của bản ghi đăng ký mới tạo hoặc lỗi.
   */
  createEnrollment: async (userID: number, courseID: number, status: EnrollmentStatus, cost: number): Promise<number> => {
    const enrollmentID = await EnrollmentModel.createEnrollment(userID, courseID, status, cost);
    return enrollmentID;
  },

  /**
   * Cập nhật trạng thái của bản ghi đăng ký.
   * @param userID - ID của người dùng yêu cầu cập nhật.
   * @param enrollmentID - ID của bản ghi đăng ký cần cập nhật.
   * @param status - Trạng thái mới của bản ghi đăng ký.
   * @return Promise<void>
   */
  updateEnrollmentStatus: async (userID: number, enrollmentID: number, status: EnrollmentStatus): Promise<void> => {
    const enrollment = await EnrollmentModel.findById(enrollmentID);

    if (!enrollment) throw new Error("Enrollment not found.");
    if (enrollment.UserID != userID) throw new Error("You do not have permission to update this enrollment.");

    await EnrollmentModel.updateEnrollmentStatus(enrollmentID, status);
  },

  /**
 * Cập nhật chi phí của bản ghi đăng ký.
 * @param userID - ID của người dùng yêu cầu cập nhật.
 * @param enrollmentID - ID của bản ghi đăng ký cần cập nhật.
 * @param cost - Chi phí mới của bản ghi đăng ký.
 * @return Promise<void>
 */
  updateEnrollmentCost: async (enrollmentID: number, cost: number): Promise<void> => {
    await EnrollmentModel.updateEnrollmentCost(enrollmentID, cost);
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
  },

   /**
   * Lấy thông tin bản ghi đăng ký dựa trên EnrollmentID.
   * @param enrollmentID - ID của bản ghi đăng ký.
   * @returns Promise<Enrollment> - Trả về thông tin của bản ghi đăng ký nếu tìm thấy.
   */
   check_enroll: async(userID: number, courseID: number): Promise<Enrollment> => {
    try {
      const enrollment = await EnrollmentModel.getByUserAndCourse(userID, courseID);
      if (!enrollment) {
        throw new Error("Enrollment not found.");
      }
      return enrollment;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cập nhật rating và review cho bản ghi đăng ký.
   * @param userID - ID của người dùng yêu cầu đánh giá.
   * @param enrollmentID - ID của bản ghi đăng ký cần đánh giá.
   * @param rating - Giá trị đánh giá (1-5).
   * @param review - Nội dung đánh giá tùy chọn.
   * @return Promise<void>
   */
  rateEnrollment: async (userID: number, enrollmentID: number, rating: number, review?: string): Promise<void> => {
    const enrollment = await EnrollmentModel.findById(enrollmentID);

    if (!enrollment) throw new Error("Enrollment not found.");
    if (enrollment.UserID !== userID) throw new Error("You do not have permission to rate this enrollment.");
    if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5.");

    await EnrollmentModel.updateRatingAndReview(enrollmentID, rating, review || '');
  },
};

export default enrollmentService;
