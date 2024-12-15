// src/controllers/enrollmentGatewayController.js

const axios = require('axios');

const config = require("../../../config/index")

const ENROLLMENT_SERVICE_URL = config.service_host.enrollment; 

// Tạo một enrollment mới
const createEnrollment = async (req, res) => {
  const { courseID } = req.params;
  const { cost } = req.body;  // Thông tin cần thiết từ request body
  
  try {
    let status;
    if (cost == 0) status = 'bought'; else status = 'buying';
    const response = await axios.post(`${ENROLLMENT_SERVICE_URL}/enrollment/create/${courseID}`, {
      userID: req.user.id,
      courseID,
      status: status,
      cost,
    });
    
    return res.status(201).json(response.data);  // Trả về dữ liệu từ Enrollment Service
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return res.status(400).json({
      error: error.response ? error.response.data : 'Error creating enrollment'
    });
  }
};

// Lấy enrollment theo ID
const getEnrollmentById = async (req, res) => {
  const { courseID } = req.params;
  
  try {
    const response = await axios.get(`${ENROLLMENT_SERVICE_URL}/enrollment/${courseID}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    return res.status(404).json({
      error: error.response ? error.response.data : 'Enrollment not found'
    });
  }
};

// Cập nhật trạng thái của enrollment
const updateEnrollmentStatus = async (req, res) => {
  const { enrollmentID } = req.params;
  const { userID, status } = req.body;
  
  try {
    const response = await axios.patch(`${ENROLLMENT_SERVICE_URL}/enrollment/${enrollmentID}/status`, {
      userID,
      status
    });
    
    return res.status(200).json({ message: 'Enrollment status updated successfully', data: response.data });
  } catch (error) {
    console.error('Error updating enrollment status:', error);
    return res.status(400).json({
      error: error.response ? error.response.data : 'Error updating enrollment status'
    });
  }
};

// Xóa enrollment
const deleteEnrollment = async (req, res) => {
  const { enrollmentID } = req.params;
  const { userID } = req.body;

  try {
    const response = await axios.delete(`${ENROLLMENT_SERVICE_URL}/enrollment/${enrollmentID}`, {
      data: { userID }
    });
    
    return res.status(200).json({ message: 'Enrollment deleted successfully', data: response.data });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    return res.status(400).json({
      error: error.response ? error.response.data : 'Error deleting enrollment'
    });
  }
};

// Lấy tất cả enrollments của một khóa học
const getAllEnrollmentsByCourse = async (req, res) => {
  const { courseID } = req.params;

  try {
    const response = await axios.get(`${ENROLLMENT_SERVICE_URL}/enrollment/get-by-course/${courseID}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching enrollments for course:', error);
    return res.status(400).json({
      error: error.response ? error.response.data : 'Error fetching enrollments for course'
    });
  }
};

// Lấy tất cả enrollments của một người dùng
const getAllEnrollmentsByUser = async (req, res) => {
  const { userID } = req.query;

  try {
    const response = await axios.get(`${ENROLLMENT_SERVICE_URL}/enrollment/get-by-user`, {
      params: { userID }
    });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching enrollments for user:', error);
    return res.status(400).json({
      error: error.response ? error.response.data : 'Error fetching enrollments for user'
    });
  }
};

module.exports = {
  createEnrollment,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
  getAllEnrollmentsByCourse,
  getAllEnrollmentsByUser
};
