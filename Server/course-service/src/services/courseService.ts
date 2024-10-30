import chapterModel from "../models/chapterModel";
import lessonModel from "../models/lessonModel";
import courseModel from "../models/courseModel";
import firebaseHelper from "../helpers/firebaseHelper";
import { Course, Chapter, Lesson } from "../types/models"; // Assuming types are defined for Course, Chapter, and Lesson

const courseService = {
  /**
   * Tạo một khóa học mới.
   * @param userID - ID của người dùng yêu cầu tạo khóa học.
   * @return Promise<number> - ID của khóa học mới tạo hoặc lỗi.
   */
  create: async (userID: number): Promise<number> => {
    try {
      const courseID = await courseModel.createCourse(userID, new Date());
      return courseID;
    } catch (err) {
      console.log(`Error creating course: ${(err as Error).message}`);
      throw err;
    }
  },

  /**
   * Get detailed information of a course with chapters and lessons
   * @param courseID - ID of the course
   * @param userID - ID of the user (for ownership verification)
   * @return Promise<Object> - Course details with chapters and lessons
   */
  getCourseDetails: async (courseID: number, userID: number) => {
    const course = await courseModel.findById(courseID);
    if (!course) throw new Error("Course not found");

    const chapters = await chapterModel.getChaptersByCourseID(courseID);
    const chapterIDs = chapters.map(chapter => chapter.ChapterID);
    const lessons = await lessonModel.getLessonsByChapterIDs(chapterIDs);

    const lessonsByChapter = lessons.reduce((acc: { [key: number]: Lesson[] }, lesson: Lesson) => {
      if (!acc[lesson.ChapterID]) acc[lesson.ChapterID] = [];
      acc[lesson.ChapterID].push(lesson);
      return acc;
    }, {});

    const chaptersWithLessons = chapters.map((chapter) => ({
      ...chapter,
      lessons: lessonsByChapter[chapter.ChapterID] || [],
    }));

    return { ...course, chapters: chaptersWithLessons };
  },

  /**
   * Cập nhật tên khóa học.
   * @param userID - ID của người dùng yêu cầu cập nhật.
   * @param courseID - ID của khóa học cần cập nhật.
   * @param name - Tên mới của khóa học.
   * @return Promise<void>
   */
  updateCourseName: async (userID: number, courseID: number, name: string): Promise<void> => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) throw new Error("Course not found.");
      if (course.UserID !== userID) throw new Error("You do not have permission to update this course.");

      const existingCourse = await courseModel.findByName(name);
      if (existingCourse && existingCourse.CourseID !== courseID) throw new Error("Course name is not available.");

      await courseModel.updateName(courseID, name);
    } catch (err) {
      throw err;
    }
  },

  /**
   * Update state of course.
   * @param courseID - ID của khóa học.
   * @param newStatus - Trạng thái mới của khóa học.
   */
  updateCourseStatus: async (courseID: number, newStatus: string): Promise<void> => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) throw new Error("Course not found.");

      await courseModel.updateStatus(courseID, newStatus);
    } catch (err) {
      console.log(`Error updating course status: ${(err as Error).message}`);
      throw err;
    }
  },

  /**
   * Update course avatar.
   */
  updateCourseAvatar: async (userID: number, courseID: number, file: Express.Multer.File): Promise<void> => {
    try {
      if (!file) throw new Error("File is required for updating course avatar.");

      const course = await courseModel.findById(courseID);
      if (!course) throw new Error("Course not found.");
      if (course.UserID !== userID) throw new Error("You do not have permission to update this course.");

      let fileLink = course.PictureLink;
      if (fileLink) await firebaseHelper.deleteFile(fileLink);

      fileLink = await firebaseHelper.uploadAvatarCourse(file);
      await courseModel.updateAvatar(courseID, fileLink);
    } catch (err) {
      console.log(`Error updating course avatar: ${(err as Error).message}`);
      throw err;
    }
  },

  /**
   * Update course shortcut.
   */
  updateCourseShortcut: async (userID: number, courseID: number, content: string): Promise<void> => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) throw new Error("Course not found.");
      if (course.UserID !== userID) throw new Error("You do not have permission to update this course.");

      await courseModel.updateShortcut(courseID, content);
    } catch (err) {
      console.log(`Error updating course shortcut: ${(err as Error).message}`);
      throw err;
    }
  },

  /**
   * Update course description.
   */
  updateCourseDescription: async (userID: number, courseID: number, content: string): Promise<void> => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) throw new Error("Course not found.");
      if (course.UserID !== userID) throw new Error("You do not have permission to update this course.");

      await courseModel.updateDescription(courseID, content);
    } catch (err) {
      console.log(`Error updating course description: ${(err as Error).message}`);
      throw err;
    }
  },

  /**
   * Update course cost.
   */
  updateCourseCost: async (userID: number, courseID: number, amount: number): Promise<void> => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) throw new Error("Course not found.");
      if (course.UserID !== userID) throw new Error("You do not have permission to update this course.");

      await courseModel.updateCost(courseID, amount);
    } catch (err) {
      console.log(`Error updating course cost: ${(err as Error).message}`);
      throw err;
    }
  },

  /**
 * Confirm a course.
 * @param userID - The ID of the user requesting the confirmation.
 * @param courseID - The ID of the course to confirm.
 * @return Promise<void>
 */
  confirmCourse: async (userID: number, courseID: number): Promise<void> => {
    try {
      // Find the course by its ID
      const course = await courseModel.findById(courseID);
      if (!course) throw new Error("Course not found.");

      // Check if the user is authorized to confirm this course
      if (course.UserID !== userID) throw new Error("You do not have permission to confirm this course.");

      // Update the course status to "confirmed"
      await courseModel.updateStatus(courseID, "confirmed");
    } catch (err) {
      console.log(`Error confirming course: ${(err as Error).message}`);
      throw err;
    }
  },

  /**
   * Delete a course.
   * @param userID - The ID of the user requesting the deletion.
   * @param courseID - The ID of the course to delete.
   * @return Promise<void>
   */
  deleteCourse: async (userID: number, courseID: number): Promise<void> => {
    try {
      // Verify the course exists
      const course = await courseModel.findById(courseID);
      if (!course) throw new Error("Course not found.");
      
      // Verify the user has permission to delete the course
      if (course.UserID !== userID) throw new Error("You do not have permission to delete this course.");

      // If there’s an associated file (like an avatar), delete it
      if (course.PictureLink) {
        await firebaseHelper.deleteFile(course.PictureLink);
      }

      // Remove associated chapters and lessons before deleting the course itself
      const chapters = await chapterModel.getChaptersByCourseID(courseID);
      for (const chapter of chapters) {
        const lessons = await lessonModel.getLessonsByChapterID(chapter.ChapterID);
        
        // Delete all lesson files from Firebase
        for (const lesson of lessons) {
          if (lesson.FileLink) await firebaseHelper.deleteFile(lesson.FileLink);
        }
        
        // Delete lessons in each chapter
      }
      
      // Finally, delete the course
      await courseModel.deleteCourse(courseID);

    } catch (err) {
      console.log(`Error deleting course: ${(err as Error).message}`);
      throw err;
    }
  }
};

export default courseService;
