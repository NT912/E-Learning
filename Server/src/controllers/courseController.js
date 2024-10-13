const courseService = require("~/services/courseService");

const courseController = {
  createCourse: (req, res) => {
    courseService.createCourse(req.body, (err, result) => {
      if (err) return res.status(400).send(err);
      res.status(201).send(result);
    });
  },

  updateCourseTitle: (req, res) => {
    
  }
};

module.exports = courseController;
