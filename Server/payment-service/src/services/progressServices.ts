// src/services/progressService.ts
import enrollmentModel from "../models/enrollmentModels";
import ProgressModel from "../models/progressModels";

const progressService = {
  /**
   * Cập nhật tiến trình của một bài học.
   * @param enrollmentID - ID của bản ghi đăng ký.
   * @param lessonID - ID của bài học.
   * @param progressTime - Thời gian hoàn thành bài học.
   * @param isCompleted - Trạng thái hoàn thành bài học.
   * @param attempts - Số lần học.
   */
  updateProgress: async (
    enrollmentID: number,
    lessonID: number,
    progressTime: number,
    isCompleted: boolean,
    attempts: number
  ): Promise<void> => {
    const progress = await ProgressModel.findByEnrollmentAndLesson(enrollmentID, lessonID);

    if (!progress) throw new Error("Progress record not found.");

    await ProgressModel.updateProgress(enrollmentID, lessonID, progressTime, isCompleted, attempts);
  },

  /**
   * Lấy tiến trình của một bài học.
   * @param enrollmentID - ID của bản ghi đăng ký.
   * @param lessonID - ID của bài học.
   * @return Promise<Progress | null> - Tiến trình của bài học.
   */
  getProgress: async (enrollmentID: number, lessonID: number) => {
    return ProgressModel.findByEnrollmentAndLesson(enrollmentID, lessonID);
  },

  /**
   * Thêm tiến trình mới cho một bài học.
   * @param enrollmentID - ID của bản ghi đăng ký.
   * @param lessonID - ID của bài học.
   * @param progressTime - Thời gian ban đầu.
   * @param attempts - Số lần thử ban đầu.
   */
  addProgress: async (enrollmentID: number, lessonID: number, userID: number): Promise<number> => {
    const enrollment = await enrollmentModel.findById(enrollmentID);
    if (!enrollment) throw new Error("Enrollment not found");
    if (enrollment.UserID != userID) throw new Error("User do not have permission to rate this enrollment")

    return await ProgressModel.addNewProgress(enrollmentID, lessonID);
  }
};

export default progressService;
