const courseService = require("~/services/courseService");

const courseController = {
  createCourse: (req, res) => {
    const userID = req.body.userID

    courseService.create(userID, (err, result) => {
      if (err) return res.status(400).send(err);
      res.status(201).send(result);
    });
  },

  updateCourseTitle: (req, res) => {
    
  }
};

module.exports = courseController;
