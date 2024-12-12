// controllers/authController.js
const axios = require("axios");
const config = require("../../../config/index");

const AUTH_SERVICE_URL = config.service_host.auth;

const signup = async (req, res) => {
  try {
    console.log(
      "Calling signup API with URL:",
      `${AUTH_SERVICE_URL}/auth/signup`
    );
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/signup`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const adminSignup = async (req, res) => {
  try {
    // Thêm role: 'admin' vào request body
    const adminData = { ...req.body, role: "admin" };

    console.log(
      "Calling admin signup API with URL:",
      `${AUTH_SERVICE_URL}/auth/admin/signup`
    );

    // Gửi dữ liệu đã thêm role lên API
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/admin/signup`,
      adminData
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during admin signup:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    console.log(
      "Calling login API with URL:",
      `${AUTH_SERVICE_URL}/auth/login`
    );
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/login`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    console.log(
      "Calling admin login API with URL:",
      `${AUTH_SERVICE_URL}/auth/admin/login`
    );
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/admin/login`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    console.log(
      "Calling logout API with URL:",
      `${AUTH_SERVICE_URL}/auth/logout`
    );
    const token = req.headers["authorization"];
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/logout`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.headers["authorization"]; // Lấy token từ header
    const response = await axios.get(`${AUTH_SERVICE_URL}/auth/verify-token`, {
      headers: { Authorization: token },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(error.response?.status || 500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  adminSignup,
  login,
  adminLogin,
  logout,
  verifyToken,
};
