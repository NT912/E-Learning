const Course = require("../models/Course");

exports.createCourse = (req, res) => {
  const { name, description, cost, categoryID, userID } = req.body;
  Course.create(
    { name, description, cost, categoryID, userID },
    (err, result) => {
      if (err) return res.status(400).send("Error creating course");
      res.status(201).send("Course created");
    }
  );
};

exports.getCourses = (req, res) => {
  Course.getAll((err, courses) => {
    if (err) return res.status(500).send("Error fetching courses");
    res.status(200).json(courses);
  });
};

exports.getCourseById = (req, res) => {
  const { id } = req.params;
  Course.getById(id, (err, course) => {
    if (err) return res.status(404).send("Course not found");
    res.status(200).json(course);
  });
};
