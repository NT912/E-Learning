const chapterModel = require("../models/chapterModel");
const lessonModel = require("../models/lessonModel");
const courseModel = require("../models/courseModel");
const firebaseHelper = require("../helpers/firebaseHelper");

const courseService = {
  /**
   * Tạo một khóa học mới.
   * @param {Number} userID - ID của người dùng yêu cầu tạo khóa học.
   * @return {Promise<Number>} - Promise chứa ID của khóa học mới tạo hoặc lỗi.
   */
  create: async (userID) => {
    try {
      const courseID = await courseModel.createCourse(userID, new Date());
      return courseID;
    } catch (err) {
      console.log(`Error creating course: ${err.message}`);
      throw err;  
    }
  },

  /**
 * Get detailed information of a course with chapters and lessons
 * @param {Number} courseID - ID of the course
 * @param {Number} userID - ID of the user (for ownership verification)
 * @return {Promise<Object>} - Course details with chapters and lessons
 */
  getCourseDetails: async (courseID, userID) => {
    // Fetch course details
    const course = await courseModel.findById(courseID);
    if (!course) throw new Error("Course not found");

    // Fetch all chapters for the course in one query
    const chapters = await chapterModel.getChaptersByCourseID(courseID);
    const chapterIDs = chapters.map(chapter => chapter.ChapterID);

    const lessons = await lessonModel.getLessonsByChapterIDs(chapterIDs);

    const lessonsByChapter = lessons.reduce((acc, lesson) => {
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
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật.
   * @param {Number} courseID - ID của khóa học cần cập nhật.
   * @param {String} name - Tên mới của khóa học.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateCourseName: async (userID, courseID, name) => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) {
        throw new Error("Course not found.");
      }

      if (course.UserID !== userID) {
        throw new Error("You do not have permission to update this course.");
      }

      const existingCourse = await CourseModel.findByName(name);
      if (existingCourse) {
        if (existingCourse.CourseID == courseID) return;
        throw new Error("Course name is not available.");
      }

      await courseModel.updateName(courseID, name);
    } catch (err) {
      throw err;
    }
  },

  /**
   * Update state of course.
   * @param {Number} userID - ID của người dùng yêu cầu tạo khóa học.
   * @return {Promise<Number>} - Promise chứa ID của khóa học mới tạo hoặc lỗi.
   */
  updateCourseStatus: async (courseID, newStatus) => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) {
        throw new Error("Course not found.");
      }

      courseModel.updateStatus(courseID, newStatus);
    } catch (err) {
      console.log(`Error updating course status: ${err.message}`);
      throw err;
    }
  },

  updateCourseAvatar: async (userID, courseID, file) => {
    try {
      if (!file) {
        throw new Error("File is required for updating course avatar.");
      }

      const course = await courseModel.findById(courseID);
      if (!course) {
        throw new Error("Course not found.");
      }
      
      if (course.UserID != userID) {
        throw new Error("You do not have permission to update this course.");
      }

      let fileLink = course.PictureLink;
      if (fileLink) {
        await firebaseHelper.deleteFile(fileLink);
      }
      fileLink = await firebaseHelper.uploadAvatarCourse(file);

      courseModel.updateAvatar(courseID, fileLink);
    } catch (err) {
      console.log(`Error updating course avatar: ${err.message}`);
      throw err;
    }
  },

  updateCourseShortcut: async (userID, courseID, content) => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) {
        throw new Error("Course not found.");
      }

      if (course.UserID !== userID) {
        throw new Error("You do not have permission to update this course.");
      }

      courseModel.updateShortcut(courseID, content);
    } catch (err) {
      console.log(`Error updating course shortcut: ${err.message}`);
      throw err;
    }
  },

  updateCourseDescription: async (userID, courseID, content) => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) {
        throw new Error("Course not found.");
      }

      if (course.UserID !== userID) {
        throw new Error("You do not have permission to update this course.");
      }

      CcurseModel.updateDescription(courseID, content);
    } catch (err) {
      console.log(`Error updating course description: ${err.message}`);
      throw err;
    }
  },

  updateCourseCost: async (userID, courseID, amount) => {
    try {
      const course = await courseModel.findById(courseID);
      if (!course) {
        throw new Error("Course not found.");
      }

      if (course.UserID !== userID) {
        throw new Error("You do not have permission to update this course.");
      }

      courseModel.updateCost(courseID, amount);
    } catch (err) {
      console.log(`Error updating course cost: ${err.message}`);
      throw err;
    }
  },
};

module.exports = courseService;
