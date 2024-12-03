const axios = require('axios');

class CategoryController {
  constructor() {
    this.courseServiceBaseUrl = process.env.COURSE_SERVICE; // Địa chỉ của course-service
  }

  /**
   * Tạo một danh mục mới.
   */
  async create(req, res) {
    const { name, description } = req.body;

    try {
      const response = await axios.post(`${this.courseServiceBaseUrl}/course/category/add`, { name, description });
      res.status(response.status).json(response.data);
    } catch (err) {
      console.error("Error creating category:", err);
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  /**
   * Cập nhật danh mục.
   */
  async update(req, res) {
    const { categoryID } = req.params;
    const { name, description } = req.body;

    try {
      const response = await axios.post(`${this.courseServiceBaseUrl}/course/category/${categoryID}/update`, { name, description });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error updating course name.",
      });
    }
  }

  /**
   * Xóa danh mục.
   */
  async delete(req, res) {
    const { categoryID } = req.params;

    try {
      const response = await axios.delete(`${this.courseServiceBaseUrl}/course/category/${categoryID}/delete`);
      res.status(response.status).json(response.data);
    } catch (err) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.error || "Error updating course name.",
          });
    }
  }

  /**
   * Lấy tất cả danh mục.
   */
  async getAll(req, res) {
    try {
      const response = await axios.get(`${this.courseServiceBaseUrl}/course/category/getall`);
      res.status(response.status).json(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err.message);
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  /**
   * Lấy tất cả danh mục.
   */
  async getID(req, res) {
    try {
        const {categoryID} = req.params;
      const response = await axios.get(`${this.courseServiceBaseUrl}/course/category/${categoryID}`);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || "Error get detail category.",
      });
    }
  }
}

module.exports = new CategoryController();
