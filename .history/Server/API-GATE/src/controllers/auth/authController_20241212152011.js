const axios = require("axios");

class AuthController {
  constructor() {
    this.authServiceBaseUrl = process.env.AUTH_SERVICE_URL; // Địa chỉ của auth-service
  }

  /**
   * Đăng ký người dùng (User).
   */
  async signup(req, res) {
    const { email, password, username } = req.body;

    try {
      const response = await axios.post(
        `${this.authServiceBaseUrl}/auth/signup`,
        {
          email,
          password,
          username,
        }
      );
      res.status(response.status).json(response.data);
    } catch (err) {
      console.error("Error during user signup:", err);
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  /**
   * Đăng ký admin.
   */
  async signupAdmin(req, res) {
    const { email, password, username } = req.body;

    // Gán role mặc định là "admin"
    const signupData = {
      email,
      password,
      username,
      role: "admin",
    };

    try {
      const response = await axios.post(
        `${this.authServiceBaseUrl}/auth/signupadmin`,
        signupData
      );
      res.status(response.status).json(response.data);
    } catch (err) {
      console.error("Error during admin signup:", err);
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  /**
   * Đăng nhập người dùng.
   */
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const response = await axios.post(
        `${this.authServiceBaseUrl}/auth/login`,
        {
          email,
          password,
        }
      );
      res.status(response.status).json(response.data);
    } catch (err) {
      console.error("Error during user login:", err);
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  /**
   * Lấy thông tin user hiện tại.
   */
  async getCurrentUser(req, res) {
    try {
      const response = await axios.get(`${this.authServiceBaseUrl}/auth/me`, {
        headers: {
          Authorization: req.headers.authorization, // Chuyển token từ header sang
        },
      });
      res.status(response.status).json(response.data);
    } catch (err) {
      console.error("Error fetching current user info:", err);
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }

  /**
   * Đổi mật khẩu.
   */
  async changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;

    try {
      const response = await axios.put(
        `${this.authServiceBaseUrl}/auth/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: req.headers.authorization, // Chuyển token từ header sang
          },
        }
      );
      res.status(response.status).json(response.data);
    } catch (err) {
      console.error("Error changing password:", err);
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
