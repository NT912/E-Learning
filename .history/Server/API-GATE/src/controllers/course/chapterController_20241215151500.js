const axios = require("axios");
const { request } = require("express");

const config = require("../../../config/index");

const COURSE_SERVICE_URL = config.service_host.course;

console.log(COURSE_SERVICE_URL);
const courseApiController = {
  async createChapter(req, res) {
    const { courseID } = req.params;
    try {
      const user = req.user;
      const response = await axios.post(
        `${COURSE_SERVICE_URL}/course/chapter/create`,
        {
          courseID: courseID,
          userID: user.id,
        }
      );
      res
        .status(response.status)
        .json(response.data || { message: "Create chapter success." });
    } catch (error) {
      console.log(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error create chapter.",
      });
    }
  },

  async updateChapter(req, res) {
    const { chapterID } = req.params;
    const { title, description } = req.body;
    try {
      const user = req.user;
      const response = await axios.post(
        `${COURSE_SERVICE_URL}/course/chapter/${chapterID}/update`,
        {
          userID: user.id,
          title: title,
          description: description,
        }
      );
      res
        .status(response.status)
        .json(response.data || { message: "Update chapter success." });
    } catch (error) {
      console.log(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error update chapter.",
      });
    }
  },

  async deleteChapter(req, res) {
    const { chapterID } = req.params;
    try {
      const user = req.user;
      const response = await axios.delete(
        `${COURSE_SERVICE_URL}/course/chapter/${chapterID}/delete`,
        { data: { userID: user.id } }
      );
      res
        .status(response.status)
        .json(response.data || { message: "Delete chapter success." });
    } catch (error) {
      console.log(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error create chapter.",
      });
    }
  },

  async getChapter(req, res) {
    const { chapterID } = req.params;

    try {
      const response = await axios.get(`${BASE_URL}/course/${chapterID}`);
      res.status(200).json(response.data); // Trả lại dữ liệu từ backend
    } catch (err) {
      console.log(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error create chapter.",
      });
    }
  },

  /**
   * Lấy tất cả các chapter của một khóa học từ backend API.
   */
  async getChapters(req, res) {
    const { courseID } = req.params;

    try {
      const response = await axios.get(`${BASE_URL}/all/${courseID}`);
      res.status(200).json(response.data); // Trả lại dữ liệu từ backend
    } catch (err) {
      console.log(error);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error create chapter.",
      });
    }
  },
};

module.exports = courseApiController;
