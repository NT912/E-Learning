const chapterService = require("../services/chapterService");

const chapterController = {
  /**
   * Xử lý yêu cầu tạo chapter mới cho khóa học.
   */
  create: async (req, res) => {
    const { courseID } = req.params;
    const { userID } = req.body;

    try {
      const result = await chapterService.createChapter(userID, courseID);
      res.status(201).json({
        chapterID: result
      });
    } catch (err) {
      console.error(err); // Ghi lại lỗi để kiểm tra

      res.status(400).json({
        error: err.message
      });
    }
  },

  /**
   * Xử lý yêu cầu cập nhật tên chapter.
   */
  updateChapterName: async (req, res) => {
    const { chapterName } = req.body;
    const { chapterID } = req.params;
    const { userID } = req.body;

    try {
      await chapterService.updateChapterName(userID, chapterID, chapterName);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },

  /**
   * Xử lý yêu cầu xóa chapter.
   */
  deleteChapter: async (req, res) => {
    const { chapterID } = req.params;
    const { userID } = req.body;

    try {
      await chapterService.deleteChapter(userID, chapterID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  }
};

module.exports = chapterController;
