const courseService = require("~/services/courseService");
const message = require('~/config/message.json');

const sendResponse = (res, success, title, description = null) => {
  res.status(success ? 201 : 400).send({
    success,
    title,
    description,
  });
};

const courseController = {
  createCourse: (req, res) => {
    const userID = req.body.userID;

    if (!userID) {
      return sendResponse(
        res,
        false,
        message.course.creationError.title,  
        message.course.creationError.description.userIdMissing
      );
    }

    courseService.create(userID)
      .then((result) => {
        sendResponse(
          res,
          true,
          message.course.creationSuccess.title,  
          { courseID: result }
        );
      })
      .catch((err) => {
        sendResponse(
          res,
          false,
          message.course.creationError.title,
          err
        );
      });
  },

  updateCourseName: (req, res) => {
    const courseID = req.body.courseID;
    const name = req.body.courseName;

    if (!courseID || !name) {
      return sendResponse ( 
        res,
        false,
        message.course.updateError.mis
      )
    }

    courseService.updateCourseName(courseID, name) 
      .then((result) => {

      })
      .catch((err) => {

      }) ;
  }
};

module.exports = courseController;
