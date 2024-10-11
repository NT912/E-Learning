const courseService = require("..");
import { courseService } from "~/services/courseService";

exports.createCourse = (req, res) => {
  courseService.createCourse(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    res.status(201).send(result);
  });
};

exports.getCourses = (req, res) => {
  courseService.getCourses((err, courses) => {
    if (err) return res.status(500).send("Error fetching courses");
    res.status(200).json(courses);
  });
};
