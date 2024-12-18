import LessonModel from "../models/lessonModel";
import courseModel from "../models/courseModel";
import firebaseHelper from "../helpers/firebaseHelper";
import { getVideoDurationInSeconds } from "get-video-duration";
import { Express } from "express";

const lessonService = {
  /**
   * Tạo một bài học mới trong chương.
   * @param userID - ID của người dùng yêu cầu tạo bài học.
   * @param chapterID - ID của chương mà bài học sẽ được thêm vào.
   * @return Promise<number> - ID của bài học mới tạo hoặc lỗi.
   */
  createLesson: async (userID: number, chapterID: number): Promise<number> => {
    const course = await courseModel.findCourseByChapterID(chapterID);
    if (!course) throw new Error("Course not found.");
    if (course.UserID !== userID) throw new Error("You do not have permission to create a lesson in this course.");

    const lessonID = await LessonModel.createLesson(chapterID);
    return lessonID;
  },

  /**
   * Get detailed information of a lesson, verifying user's ownership or access rights.
   * @param lessonID - ID of the lesson to retrieve.
   * @return Promise<Object> - Returns lesson details or throws an error if access is denied.
   */
  getLessonDetails: async (lessonID: number) => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) throw new Error("Lesson not found");
    return lesson;
  },

  /**
   * Get detailed information of a lesson, verifying user's ownership or access rights.
   * @param lessonID - ID of the lesson to retrieve.
   * @return Promise<Object> - Returns lesson details or throws an error if access is denied.
   */
  getLessonByCourse: async (lessonID: number) => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) throw new Error("Lesson not found");
    return lesson;
  },

  /**
   * Cập nhật bài học.
   * @param userID - ID của người dùng yêu cầu cập nhật bài học.
   * @param lessonID - ID của bài học cần cập nhật.
   * @param title - Tiêu đề mới của bài học.
   * @param description - Mô tả mới của bài học.
   * @param file - File mới của bài học.
   * @return Promise<void>
   */
  updateLesson: async (
    userID: number,
    lessonID: number,
    title: string,
    description: string,
    file: Express.Multer.File | undefined,
    link: string | null
  ): Promise<void> => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) throw new Error("Lesson not found.");

    const course = await courseModel.findCourseByLessonID(lessonID);
    if (!course || course.UserID != userID) throw new Error("You do not have permission to update this lesson.");

    let fileLink: string = lesson.FileLink? lesson.FileLink : '';
    let duration: number = 0;

    let fileType = 'link';
    if (file) {
      try {
        // Delete existing file, if any, before uploading a new one
        if (fileLink) await firebaseHelper.deleteFile(fileLink);

        fileType = file.mimetype;

        // Get video duration if the file is a video
        if (fileType === "video/mp4") {
          duration = await getVideoDurationInSeconds(file.path);
        }

        // Upload the new file and get the file link
        fileLink = await firebaseHelper.uploadVideo(file);
      } catch (err) {
        console.error("File upload error:", err);
        throw new Error("Error uploading new file.");
      }
    } 

    console.log(link)
    // Update lesson with new information
    await LessonModel.updateLesson(lessonID, title, description, fileLink, fileType, duration, link);
  },

  /**
   * Cập nhật trạng thái demo cho bài học.
   * @param userID - ID của người dùng yêu cầu cập nhật bài học.
   * @param lessonID - ID của bài học cần cập nhật.
   * @return Promise<void>
   */
  updateLessonAllowDemo: async (userID: number, lessonID: number): Promise<void> => {
    console.log(userID, lessonID)
    
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) throw new Error("Lesson not found.");

    const course = await courseModel.findCourseByLessonID(lessonID);
    if (!course) throw new Error("Course not found.");
    if (course.UserID !== userID) throw new Error("You do not have permission to update this lesson.");

    const newState = !lesson.IsAllowDemo;
    await LessonModel.updateLessonAllowDemo(lessonID, newState);
  },

  /**
   * Xóa một bài học.
   * @param userID - ID của người dùng yêu cầu xóa bài học.
   * @param lessonID - ID của bài học cần xóa.
   * @return Promise<void>
   */
  deleteLesson: async (userID: number, lessonID: number): Promise<void> => {
    const lesson = await LessonModel.findById(lessonID);
    if (!lesson) throw new Error("Lesson not found.");

    const course = await courseModel.findCourseByLessonID(lessonID);
    if (!course) throw new Error("Course not found.");
    if (course.UserID !== userID) throw new Error("You do not have permission to delete this lesson.");

    if (lesson.FileLink) {
      try {
        await firebaseHelper.deleteFile(lesson.FileLink);
        console.log(`File deleted from Firebase: ${lesson.FileLink}`);
      } catch (err) {
        console.log(`Failed to delete file from Firebase: ${(err as Error).message}`);
        throw new Error("Failed to delete file from Firebase.");
      }
    }

    await LessonModel.deleteLesson(lessonID);
  }
};

export default lessonService;
