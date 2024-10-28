const chapterService = require("../services/course/chapterService");

const chapterController = {
  /**
   * Xử lý yêu cầu tạo chapter mới cho khóa học.
   */
  create: async (req, res) => {
    const { courseID} = req.params;
    const user = req.user;

    try {
      const result = await chapterService.createChapter(
        user.id,
        courseID,
      );
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
    const user = req.user;

    try {
      await chapterService.updateChapterName(user.id, chapterID, chapterName);
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
    const user = req.user;

    try {
      await chapterService.deleteChapter(user.id, chapterID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  }
};

module.exports = chapterController;
