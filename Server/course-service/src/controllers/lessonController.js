const lessonService = require("../services/lessonService");

const lessonController = {
  /**
   * Tạo một bài học mới.
   */
  create: async (req, res) => {
    const { chapterID } = req.params;
    const { userID } = req.body;

    try {
      const result = await lessonService.createLesson(userID, chapterID);
      res.status(201).json({
        lessonID: result
      });
    } catch (err) {
      console.error("Error during lesson creation:", err);
      res.status(400).json({
        error: err.message
      });
    }
  },

  /**
   * Get details of a single lesson.
   */
  getALesson: async (req, res) => {
    const { lessonID } = req.params;
    try {
      const lesson = await lessonService.getLessonDetails(lessonID);
      
      res.status(200).json(lesson);
    } catch (err) {
      console.error("Error fetching lesson details:", err);
      res.status(400).json({
        error: err.message || "An error occurred while fetching the lesson."
      });
    }
  },

  /**
   * update a lesson
   */
  updateLesson: async (req, res) => {
    const { lessonID } = req.params;
    const { title, description, userID } = req.body;
    const file = req.file;

    try {
      if (file) {
        const fileType = file.mimetype;

        const allowedTypes = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "video/mp4", 
          "image/jpeg", 
          "image/png", 
          "application/vnd.ms-excel", 
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
          "application/zip" 
        ];
        
        if (!allowedTypes.includes(fileType)) {
          throw new Error("File type is not supported. Allowed types: PDF, Word, Video, Image, Excel.");
        }
      }

      await lessonService.updateLesson(userID, lessonID, title, description, file);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },


  /**
   * Cập nhật trạng thái cho phép demo của bài học.
   */
  updateLessonAllowDemo: async (req, res) => {
    const { lessonID } = req.params;
    const { userID } = req.body;

    try {
      await lessonService.updateLessonAllowDemo(userID, lessonID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },

  /**
   * Xóa bài học.
   */
  delete: async (req, res) => {
    const { lessonID } = req.params;
    const { userID } = req.body;

    try {
      await lessonService.deleteLesson(userID, lessonID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },
};

module.exports = lessonController;
