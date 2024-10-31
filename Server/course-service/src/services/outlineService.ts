import CourseModel from '../models/courseModel';
import OutlineModel from '../models/outlineModel';

const outlineService = {
  /**
   * Tạo một mục tiêu học tập mới cho khóa học.
   * @param userID - ID của người dùng yêu cầu tạo mục tiêu học tập.
   * @param courseID - ID của khóa học mà mục tiêu học tập sẽ được thêm vào.
   * @return Promise<number> - ID của mục tiêu học tập mới tạo hoặc lỗi.
   */
  createOutline: async (userID: number, courseID: number): Promise<number> => {
    const course = await CourseModel.findById(courseID);
    if (!course) throw new Error("Course not found.");
    if (userID !== course.UserID) throw new Error("You do not have permission to create a learning outcome for this course.");

    const outComeID = await OutlineModel.addLearningOutcome(courseID);
    return outComeID;
  },

  /**
   * Cập nhật mục tiêu học tập.
   * @param userID - ID của người dùng yêu cầu cập nhật.
   * @param outlineID - ID của mục tiêu học tập cần cập nhật.
   * @param content - Nội dung mới của mục tiêu học tập.
   * @return Promise<void>
   */
  updateOutline: async (userID: number, outlineID: number, content: string): Promise<void> => {
    const outline = await OutlineModel.findById(outlineID);
    if (!outline) throw new Error("Learning outcome not found.");

    const courseID = outline.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) throw new Error("Course not found.");
    if (course.UserID !== userID) throw new Error("You do not have permission to update this learning outcome.");

    await OutlineModel.updateLearningOutcome(outlineID, content);
  },

  /**
   * Xóa một mục tiêu học tập.
   * @param userID - ID của người dùng yêu cầu.
   * @param outlineID - ID của mục tiêu học tập cần xóa.
   * @return Promise<void>
   */
  deleteOutline: async (userID: number, outlineID: number): Promise<void> => {
    const outline = await OutlineModel.findById(outlineID);
    if (!outline) throw new Error("Learning outcome not found.");

    const courseID = outline.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) throw new Error("Course not found.");
    if (course.UserID !== userID) throw new Error("You do not have permission to delete this learning outcome.");

    await OutlineModel.deleteLearningOutcome(outlineID);
  }
};

export default outlineService;
