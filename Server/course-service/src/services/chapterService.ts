import CourseModel from "../models/courseModel";
import ChapterModel from "../models/chapterModel";

const chapterService = {
  /**
   * Tạo một chapter mới cho khóa học.
   * @param userID - ID của người dùng yêu cầu tạo chapter.
   * @param courseID - ID của khóa học mà chapter sẽ được thêm vào.
   * @return Promise<number> - Promise chứa ID của chapter mới tạo hoặc lỗi.
   */
  createChapter: async (userID: number, courseID: number): Promise<number> => {
    // Tìm khóa học theo ID
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error("Course not found.");
    }

    if (userID !== course.UserID) {
      throw new Error("You do not have permission to create a chapter in this course.");
    }

    const chapterID = await ChapterModel.createChapter(courseID);
    return chapterID;
  },

  /**
   * Cập nhật tên chapter.
   * @param userID - ID của người dùng yêu cầu cập nhật.
   * @param chapterID - ID của chapter cần cập nhật.
   * @param name - Tên mới của chapter.
   * @return Promise<void> - Promise không trả về giá trị hoặc lỗi.
   */
  updateChapterName: async (userID: number, chapterID: number, name: string): Promise<void> => {
    const chapter = await ChapterModel.findById(chapterID);
    if (!chapter) {
      throw new Error("Chapter not found.");
    }
    
    const courseID = chapter.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error("Course not found.");
    }

    if (course.UserID !== userID) {
      throw new Error("You do not have permission to update this chapter.");
    }

    await ChapterModel.updateTitle(chapterID, name);
  },

  /**
   * Xoá một chapter.
   * @param userID - ID của người dùng yêu cầu.
   * @param chapterID - ID của chapter cần xóa.
   * @return Promise<void> - Promise không trả về giá trị hoặc lỗi.
   */
  deleteChapter: async (userID: number, chapterID: number): Promise<void> => {
    const chapter = await ChapterModel.findById(chapterID);
    if (!chapter) {
      throw new Error("Chapter not found.");
    }

    const courseID = chapter.CourseID;
    const course = await CourseModel.findById(courseID);
    if (!course) {
      throw new Error("Course not found.");
    }

    if (course.UserID !== userID) {
      throw new Error("You do not have permission to delete this chapter.");
    }

    await ChapterModel.deleteChapter(chapterID);
  }
};

export default chapterService;
