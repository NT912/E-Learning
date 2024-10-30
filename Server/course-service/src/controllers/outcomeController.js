const outlineService = require('../services/outlineService');

const outcomeController = {
  /**
   * Xử lý yêu cầu tạo mục tiêu học tập mới cho khóa học.
   */
  create: async (req, res) => {
    const { courseID } = req.params;
    const { userID } = req.body;

    try {
      const result = await outlineService.createOutline(userID, courseID);
      res.status(201).json({ outComeID: result });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Xử lý yêu cầu cập nhật mục tiêu học tập.
   */
  update: async (req, res) => {
    const { content, userID } = req.body;
    const { outcomeID } = req.params;

    try {
      await outlineService.updateOutline(userID, outcomeID, content);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Xử lý yêu cầu xóa mục tiêu học tập.
   */
  delete: async (req, res) => {
    const { outcomeID } = req.params;
    const { userID } = req.body;

    try {
      await outlineService.deleteOutline(userID, outcomeID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = outcomeController;
