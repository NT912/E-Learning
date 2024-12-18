const axios = require("axios");

const config = require("../../../config/index")
const COURSE_SERVICE_URL = config.service_host.course;

const courseDependController = {
  addCourseDepend: async (req, res) => {
    try {
      const { courseID } = req.params;
      const { dependOnCourseID, isRequire } = req.body;
      const userID = req.user.id;

      const response = await axios.post(
        `${COURSE_SERVICE_URL}/course/course-depend/${courseID}/add-depend`,
        { userID, dependOnCourseID, isRequire }
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  removeCourseDepend: async (req, res) => {
    try {
      const { courseID, dependOnCourseID } = req.params;
      const userID = req.user.id;

      const response = await axios.delete(
        `${COURSE_SERVICE_URL}/course/course-depend/${courseID}/remove-depend/${dependOnCourseID}`,
        { data: { userID } }
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },

  getCourseDependencies: async (req, res) => {
    try {
      const { courseID } = req.params;

      const response = await axios.get(
        `${COURSE_SERVICE_URL}/course/course-depend/${courseID}/dependencies`
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },
};

module.exports = courseDependController;
