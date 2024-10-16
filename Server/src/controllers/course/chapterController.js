const message = require('~/config/message.json');
const chapterService = require('../../services/course/chapterService');

const sendResponse = (res, success, title, description = null) => {
  res.status(success ? 201 : 400).send({
    success,
    title,
    description,
  });
};

const chapterController = {
     /**
   * Xử lý yêu cầu tạo chapter mới cho khóa học.
   * @param {Object} req - Yêu cầu từ client.
   * @param {Object} res - Đối tượng response để gửi phản hồi về client.
   */
  create: async (req, res) => {
    const { courseID, chapterName } = req.body;
    const user = req.user;

    try {
      const result = await chapterService.createChapter(user.id, courseID, chapterName);
      sendResponse(
        res,
        true,
        message.chapter.creationSuccess.title,
        { chapterID: result }
      );
    } catch (err) {
      console.error(err); // Ghi lại lỗi để kiểm tra

      sendResponse(
        res,
        false,
        message.chapter.creationError.title,
        err.message
      );
    }
  },

    updateChapterName: async (req, res) => {
      const { chapterID, chapterName } = req.body;
      const user = req.user;
    
      
    
      try {
        await chapterService.updateChapterName(user.id, chapterID, chapterName);
        sendResponse(
          res,
          true,
          message.chapter.updateSuccess.title,
          null
        );
      } catch (err) {
        sendResponse(
          res,
          false,
          message.chapter.updateError.title,
          err.message
        );
      }
    },

    deleteChapter: async (req, res) => {
      const { chapterID } = req.params;
      const user = req.user;
  
      try {
        await chapterService.deleteChapter(user.id, chapterID);
        sendResponse(
          res,
          true,
          message.chapter.deleteSuccess.title,
          null
        );
      } catch (err) {
        sendResponse(
          res,
          false,
          message.chapter.deleteError.title,
          err.message
        );
      }
    }
}

module.exports = chapterController;
