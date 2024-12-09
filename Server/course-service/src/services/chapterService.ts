import CourseModel from "../models/courseModel";
import ChapterModel from "../models/chapterModel";
import { Chapter } from "../types/models/Chapter";

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
  updateChapterName: async (userID: number, chapterID: number, name: string, description: string): Promise<void> => {
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

    console.log(description);
    await ChapterModel.updateTitle(chapterID, name, description);
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

    console.log(course,"  ",userID)
    if (course.UserID != userID) {
      throw new Error("You do not have permission to delete this chapter.");
    }

    await ChapterModel.deleteChapter(chapterID);
  },

  /**
   * Lấy một chapter theo ID.
   * @param chapterID - ID của chapter cần lấy.
   * @return Promise<Chapter | null> - Chapter nếu tìm thấy, null nếu không.
   */
  getChapter: async (chapterID: number): Promise<Chapter | null> => {
    try {
      const chapter = await ChapterModel.findById(chapterID);
      return chapter;
    } catch (err) {
      throw new Error("Failed to retrieve chapter: ");
    }
  },

  /**
   * Lấy tất cả các chapter của một khóa học.
   * @param courseID - ID của khóa học.
   * @return Promise<Chapter[]> - Danh sách các chapter.
   */
  getChaptersByCourse: async (courseID: number): Promise<Chapter[]> => {
    try {
      const chapters = await ChapterModel.getChaptersByCourseID(courseID);
      return chapters;
    } catch (err) {
      throw new Error("Failed to retrieve chapters: ");
    }
  }
};

export default chapterService;
