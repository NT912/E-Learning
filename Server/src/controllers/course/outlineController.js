const outlineService = require('../../services/course/outlineService');

const outlineController = {
  /**
   * Xử lý yêu cầu tạo mục tiêu học tập mới cho khóa học.
   */
  create: async (req, res) => {
    const { courseID, description } = req.body;
    const user = req.user;

    try {
      const result = await outlineService.createOutline(user.id, courseID, description);
      res.status(201).json({ outlineID: result });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Xử lý yêu cầu cập nhật mục tiêu học tập.
   */
  update: async (req, res) => {
    const { description } = req.body;
    const { outlineID } = req.params;
    const user = req.user;

    try {
      await outlineService.updateOutline(user.id, outlineID, description);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Xử lý yêu cầu xóa mục tiêu học tập.
   */
  delete: async (req, res) => {
    const { outlineID } = req.params;
    const user = req.user;

    try {
      await outlineService.deleteOutline(user.id, outlineID);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = outlineController;
