const courseService = require("../../services/course/courseService");
const message = require("../../config/message.json");
const sendResponse = require("../../helpers/sendResponse");

const courseController = {
  createCourse: async (req, res) => {
    const userID = req.body.userID;

    if (!userID) {
      return sendResponse(
        res,
        false,
        message.course.creationError.title,
        message.course.creationError.description.missRequireInfor
      );
    }

    try {
      const result = await courseService.create(userID);
      sendResponse(res, true, message.course.creationSuccess.title, {
        courseID: result,
      });
    } catch (err) {
      sendResponse(res, false, message.course.creationError.title, err.message);
    }
  },

  updateCourseName: async (req, res) => {
    const courseID = req.body.courseID;
    const name = req.body.courseName;
    const userID = req.body.userID;

    if (!courseID || !name || !userID) {
      return sendResponse(
        res,
        false,
        message.course.updateError.title,
        message.course.updateError.description.missRequireInfor
      );
    }

    try {
      await courseService.updateCourseName(userID, courseID, name);
      sendResponse(res, true, message.course.updateSuccess.title, null);
    } catch (err) {
      sendResponse(res, false, message.course.updateError.title, err.message);
    }
  },
};

module.exports = courseController;
