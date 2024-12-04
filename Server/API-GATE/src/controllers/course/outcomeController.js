const axios = require('axios');
const config = require('../../../config/index');

const COURSE_SERVICE_URL = config.service_host.course; 

class OutcomeController {
  /**
   * Xử lý yêu cầu tạo mục tiêu học tập mới cho khóa học.
   */
  async create(req, res) {
    const courseID = Number(req.params.courseID);
    const { userID } = req.body;

    try {
      // Gọi tới course-service để tạo mục tiêu học tập
      const response = await axios.post(`${COURSE_SERVICE_URL}/course/outcome/create/${courseID}`, {
        userID: userID
      });

      res.status(201).json({ outComeID: response.data.outComeID });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.response ? err.response.data.error : err.message });
    }
  }

  /**
   * Xử lý yêu cầu cập nhật mục tiêu học tập.
   */
  async update(req, res) {
    const { content, userID } = req.body;
    const outcomeID = Number(req.params.outcomeID);

    try {
      // Gọi tới course-service để cập nhật mục tiêu học tập
      await axios.post(`${COURSE_SERVICE_URL}/course/outcome/${outcomeID}/update/name`, {
        content: content,
        userID: userID
      });

      res.status(200).json({ message: "Outcome updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.response ? err.response.data.error : err.message });
    }
  }

  /**
   * Xử lý yêu cầu xóa mục tiêu học tập.
   */
  async delete(req, res) {
    const outcomeID = Number(req.params.outcomeID);
    const { userID } = req.body;

    try {
      // Gọi tới course-service để xóa mục tiêu học tập
      await axios.delete(`${COURSE_SERVICE_URL}/course/outcome/${outcomeID}/delete`, {
        userID: userID
      });

      res.status(200).json({ message: "Outcome deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.response ? err.response.data.error : err.message });
    }
  }
}

module.exports = new OutcomeController();
