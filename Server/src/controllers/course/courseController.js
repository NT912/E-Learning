const courseService = require("../../services/course/courseService");
const message = require("../../config/message.json");
const sendResponse = require("../../helpers/sendResponse");

const courseController = {
  createCourse: async (req, res) => {
    const user = req.user;
    
    try {
      const result = await courseService.create(user.id);
      sendResponse(
        res,
        true, 
        message.course.creationSuccess.title, 
        {
          courseID: result,
        }
    );
    } catch (err) {
      sendResponse(res, false, message.course.creationError.title, err.message);
    }
  },

  updateCourseName: async (req, res) => {
    const courseID = req.body.courseID;
    const name = req.body.courseName;
    const user = req.user;

    try {
      await courseService.updateCourseName(user.id, courseID, name);
      sendResponse(res, true, message.course.updateSuccess.title, null);
    } catch (err) {
      sendResponse(res, false, message.course.updateError.title, err.message);
    }
  },
};

module.exports = courseController;
