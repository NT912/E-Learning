const message = require("~/config/message.json");
const lessonService = require("~/services/course/lessonService");
const sendResponse = require("~/helpers/sendResponse");

const lessonController = {
  create: async (req, res) => {
    const {
      chapterID,
      title,
      description,
      isAllowDemo,
      period,
      orderNumber,
      userID,
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!chapterID || !title || !userID) {
      return sendResponse(
        res,
        false,
        message.lesson.creationError.title,
        message.lesson.creationError.description.missRequireInfor
      );
    }

    try {
      const result = await lessonService.createLesson(
        userID,
        chapterID,
        title,
        description,
        isAllowDemo,
        period,
        orderNumber
      );
      sendResponse(res, true, message.lesson.creationSuccess.title, {
        lessonID: result,
      });
    } catch (err) {
      console.error(err);
      sendResponse(res, false, message.lesson.creationError.title, err.message);
    }
  },
};

module.exports = lessonController;
