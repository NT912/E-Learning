const axios = require("axios");
const sendResponse = require("../../helpers/sendResponse");
const messages = require("../../../config/message.json");
const config = require("../../../config/index");

class AuthController {
  constructor() {
    this.authServiceBaseUrl = config.service_host.auth;
  }

  /**
   * Đăng ký người dùng.
   */
  async signup(req, res) {
    try {
      const response = await axios.post(
        `${this.authServiceBaseUrl}/auth/signup`,
        req.body
      );

      return sendResponse(
        res,
        true,
        messages.auth.signupSuccess.title,
        response.data.message,
        response.data.user
      );
    } catch (error) {
      console.error("Error during signup:", error);
      return sendResponse(
        res,
        false,
        messages.auth.signupError.title,
        error.message || messages.auth.signupError.description.signupFailed
      );
    }
  }

  /**
   * Đăng ký admin.
   */
  async signupAdmin(req, res) {
    try {
      const signupData = {
        ...req.body,
        role: "admin",
      };

      const response = await axios.post(
        `${this.authServiceBaseUrl}/auth/signupadmin`,
        signupData
      );

      return sendResponse(
        res,
        true,
        messages.auth.signupSuccess.title,
        response.data.message,
        response.data.user
      );
    } catch (error) {
      console.error("Error during signupAdmin:", error);
      return sendResponse(
        res,
        false,
        messages.auth.signupError.title,
        error.message || messages.auth.signupError.description.signupFailed
      );
    }
  }

  /**
   * Đăng nhập người dùng.
   */
  async login(req, res) {
    try {
      const response = await axios.post(
        `${this.authServiceBaseUrl}/auth/login`,
        req.body
      );

      return sendResponse(res, true, messages.auth.loginSuccess.title, {
        token: response.data.token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return sendResponse(
        res,
        false,
        messages.auth.loginError.title,
        error.message || messages.auth.loginError.description.loginFailed
      );
    }
  }

  /**
   * Đăng nhập admin.
   */
  async adminLogin(req, res) {
    try {
      const response = await axios.post(
        `${this.authServiceBaseUrl}/auth/adminlogin`,
        req.body
      );

      return sendResponse(res, true, messages.auth.loginSuccess.title, {
        token: response.data.token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return sendResponse(
        res,
        false,
        messages.auth.loginError.title,
        error.message || messages.auth.loginError.description.loginFailed
      );
    }
  }

  /**
   * Đăng xuất.
   */
  async logout(req, res) {
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      if (!token) {
        return res.status(401).json(messages.auth.token.description.missToken);
      }

      // Gọi API vào auth-service để thêm token vào blacklist
      await axios.post(`${this.authServiceBaseUrl}/auth/logout`, {
        token,
      });

      return sendResponse(
        res,
        true,
        messages.auth.logoutSuccess.title,
        messages.auth.logoutSuccess.description
      );
    } catch (error) {
      console.error("Logout error:", error);
      return sendResponse(
        res,
        false,
        messages.auth.logoutError.title,
        error.message || messages.auth.logoutError.description
      );
    }
  }

  /**
   * Xác minh token.
   */
  async verifyToken(req, res) {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message:
          "Token is missing. Please provide a token to access this resource.",
      });
    }

    const tokenParts = token.split(" ");
    if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
      return res.status(401).json({
        message:
          "Invalid token format. Token must be in the format 'Bearer <token>'.",
      });
    }

    const actualToken = tokenParts[1];

    try {
      // Gọi API của auth-service để xác minh token
      const response = await axios.post(
        `${this.authServiceBaseUrl}/auth/verify-token`,
        { token: actualToken }
      );

      res.status(200).json({
        message: "Token is valid",
        user: response.data.user,
      });
    } catch (err) {
      console.error("Verify token error:", err);
      return res.status(403).json({
        message: "Token is invalid or has expired. Please login again.",
      });
    }
  }
}

module.exports = new AuthController();
