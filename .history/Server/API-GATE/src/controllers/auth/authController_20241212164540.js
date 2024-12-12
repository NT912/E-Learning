// controllers/authController.js
const axios = require("axios");
const config = require("../../../config/index");
const messages = require("../../../config/message.json");

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
    res.status(response.status).json({
      message: messages.auth.signupSuccess.title,
      description: messages.auth.signupSuccess.description,
      data: response.data,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    let errorMessage = messages.auth.signupError.title;
    let errorDetails = messages.auth.signupError.description.signupFailed;

    if (error.response && error.response.data) {
      if (error.response.data.emailExists) {
        errorMessage = messages.auth.signupError.description.emailExists;
        errorDetails = messages.auth.signupError.description.emailExists;
      }
    }

    res.status(error.response?.status || 500).json({
      message: errorMessage,
      description: errorDetails,
      error: error.message,
    });
  }
};

const adminSignup = async (req, res) => {
  try {
    const adminData = { ...req.body, role: "admin" };

    console.log(
      "Calling admin signup API with URL:",
      `${AUTH_SERVICE_URL}/auth/admin/signup`
    );
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/auth/admin/signup`,
      adminData
    );

    res.status(response.status).json({
      message: messages.auth.adminSignupSuccess.title,
      description: messages.auth.adminSignupSuccess.description,
      data: response.data,
    });
  } catch (error) {
    console.error("Error during admin signup:", error);
    res.status(error.response?.status || 500).json({
      message: messages.auth.adminSignupError.title,
      description: messages.auth.adminSignupError.description.signupFailed,
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
    res.status(response.status).json({
      message: messages.auth.loginSuccess.title,
      description: messages.auth.loginSuccess.description,
      data: response.data,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(error.response?.status || 500).json({
      message: messages.auth.loginError.title,
      description: messages.auth.loginError.description.loginFailed,
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
    res.status(response.status).json({
      message: messages.auth.adminLoginSuccess.title,
      description: messages.auth.adminLoginSuccess.description,
      data: response.data,
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(error.response?.status || 500).json({
      message: messages.auth.adminLoginError.title,
      description: messages.auth.adminLoginError.description.loginFailed,
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

    res.status(response.status).json({
      message: messages.auth.logoutSuccess.title,
      description: messages.auth.logoutSuccess.description,
      data: response.data,
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(error.response?.status || 500).json({
      message: messages.auth.logoutError.title,
      description: messages.auth.logoutError.description.missingToken,
      error: error.message,
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const response = await axios.get(`${AUTH_SERVICE_URL}/auth/verify-token`, {
      headers: { Authorization: token },
    });

    res.status(response.status).json({
      message: messages.auth.verifyTokenSuccess.title,
      description: messages.auth.verifyTokenSuccess.description,
      data: response.data,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(error.response?.status || 500).json({
      message: messages.auth.verifyTokenError.title,
      description: messages.auth.verifyTokenError.description.missToken,
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
