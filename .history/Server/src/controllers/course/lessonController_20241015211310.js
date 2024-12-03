const message = require("../../config/message.json");
const lessonService = require("../../services/course/lessonService");
const sendResponse = require("../../helpers/sendResponse");

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

  updateLesson: async (req, res) => {
    const { lessonID, title, description, userID } = req.body;

    if (!lessonID || !title || !userID) {
      return sendResponse(
        res,
        false,
        message.lesson.updateError.title,
        message.lesson.updateError.description.missRequireInfor
      );
    }

    try {
      await lessonService.updateLesson(userID, lessonID, title, description);
      sendResponse(res, true, message.lesson.updateSuccess.title);
    } catch (err) {
      sendResponse(res, false, message.lesson.updateError.title, err.message);
    }
  },

  delete: async (req, res) => {
    const { lessonID, userID } = req.body;

    if (!lessonID || !userID) {
      return sendResponse(
        res,
        false,
        message.lesson.deleteError.title,
        message.lesson.deleteError.description.missRequireInfor
      );
    }

    try {
      await lessonService.deleteLesson(userID, lessonID);
      sendResponse(res, true, message.lesson.deleteSuccess.title);
    } catch (err) {
      sendResponse(res, false, message.lesson.deleteError.title, err.message);
    }
  },
};

module.exports = lessonController;
