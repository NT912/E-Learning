const axios = require("axios"); // Sử dụng axios để gọi đến course service

const courseServiceBaseURL = process.env.COURSE_SERVICE;
const OutcomeController = {
  async create(req, res) {
    const { courseID } = req.params;
    try {
      const response = await axios.post(`${courseServiceBaseURL}/outcome/create/${courseID}`, {
        userID: req.user.id
    });
      res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error.response?.data);
        res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || `Error updating lecategoryvel`,
      });
    }
  },

  /**
   * Proxy to update an outcome's name
   */
  async update(req, res) {
    const { outcomeID } = req.params;
    try {
      const response = await axios.post(`${courseServiceBaseURL}/outcome/${outcomeID}/update/name`, 
        {
            userID: req.user.id,
            content: req.body.content
        }
      );
      res.status(response.status).json(response.data);
    }catch (error) {
        console.error(error.response?.data);
        res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || `Error updating lecategoryvel`,
      });
    }
  },

  /**
   * Proxy to delete an outcome
   */
  async delete(req, res) {
    const { outcomeID } = req.params;
    try {
      const response = await axios.delete(`${.courseServiceBaseURL}/outcome/${outcomeID}/delete`, 
        { userID: req.user.id }
    );
      res.status(response.status).json(response.data);
    } 
    catch (error) {
        console.error(error.response?.data);
        res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || `Error updating lecategoryvel`,
      });
    }
  }
}

module.exports = OutcomeController;
