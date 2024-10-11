// controllers/CourseController.js
const CourseService = require('../services/courseService');
const message = require('../config/message.json');

exports.createCourse = (req, res) => {
  const userID = req.body.userID; 
  if (!userID){
    return res.status(400).json(
      { 
        success: false, 
        message: message.course.userIdMissing.title, 
        error: {
          description: message.course.userIdMissing.description
        }
      }
    );
  }

  CourseService.create(userID)
    .then(courseID => {
      res.status(200).json(
        { success: true, 
          courseID: courseID 
        }
      );
    })
    .catch(err => {
      res.status(500).json(
        { 
          success: false, 
          message: message.course.creationError.title,
          error: err 
        }
      );
    });
};

exports.updateName = (req, res) => {
  const { userID, courseID, name } = req.body;

  if (!userID || !courseID || !name) {
    return res.status(400).json({
      success: false,
      message: message.course.updateError.missingFields.title,
      error: {
        description: message.course.updateError.missingFields.description
      }
    });
  }

  CourseService.updateCourseName(userID, courseID, name)
    .then(() => {
      res.status(200).json({
        success: true,
        message: message.course.updateSuccess.title
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: message.course.updateError.title,
        error: err
      });
    });
};
