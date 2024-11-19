const message = require('~/config/message.json');
const chapterService = require('~/services/course/chapterService');

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
    const { courseID, chapterName, userID } = req.body;

    // Kiểm tra các tham số đầu vào
    if (!courseID || !chapterName || !userID) {
      return sendResponse(
        res,
        false,
        message.chapter.creationError.title,
        message.chapter.creationError.description.missRequireInfor
      );
    }

    try {
      const result = await chapterService.createChapter(userID, courseID, chapterName);
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
      const chapterID = req.body.chapterID;
      const name = req.body.chapterName;
      const userID = req.body.userID;
    
      // Kiểm tra các tham số đầu vào
      if (!chapterID || !name || !userID) {
        return sendResponse( 
          res,
          false,
          message.chapter.updateError.title,
          message.chapter.updateError.description.missRequireInfor
        );
      }
    
      try {
        await chapterService.updateChapterName(userID, chapterID, name);
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
    }
    
}

module.exports = chapterController;
