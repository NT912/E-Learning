const lessonService = require("../services/course/lessonService");

const lessonController = {
  /**
   * Tạo một bài học mới.
   * @param {Object} req - Yêu cầu từ client. Chứa thông tin chapterID và user.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  create: async (req, res) => {
    const { chapterID } = req.params;
    const user = req.user;

    try {
      const result = await lessonService.createLesson(user.id, chapterID);
      res.status(201).json({
        lessonID: result
      });
    } catch (err) {
      console.error("Error during lesson creation:", err);
      // Phản hồi lỗi
      res.status(400).json({
        error: err.message
      });
    }
  },

  /**
   * Cập nhật thông tin bài học.
   * @param {Object} req - Yêu cầu từ client. Chứa lessonID trong params và thông tin cập nhật trong body.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  updateLesson: async (req, res) => {
    const { lessonID } = req.params;
    const { title, description } = req.body;
    const user = req.user;
    const file = req.file; 

    try {
      await lessonService.updateLesson(user.id, lessonID, title, description, file);
      res.status(200).json();
    } catch (err) {
      res.status(400) .json({
        error: err.message
      });
    }
  },

  /**
   * Cập nhật thông tin bài học.
   * @param {Object} req - Yêu cầu từ client. Chứa lessonID trong params và thông tin cập nhật trong body.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  updateLessonAllowDemo: async (req, res) => {
    const { lessonID } = req.params;
    const user = req.user;

    try {
      await lessonService.updateLessonAllowDemo(user.id, lessonID);
      res.status(200).json();
    } catch (err) {
      res.status(400) .json({
        error: err.message
      });
    }
  },

  /**
   * Xóa bài học.
   * @param {Object} req - Yêu cầu từ client. Chứa lessonID và userID trong body.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  delete: async (req, res) => {
    const { lessonID } = req.params;
    const user = req.user;

    try {
      await lessonService.deleteLesson(user.id, lessonID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },
};

module.exports = lessonController;
