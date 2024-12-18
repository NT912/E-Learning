const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../helpers/blacklist");
const message = require("../../config/message.json");

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json(message.auth.token.description.missToken);
    }

    const tokenParts = token.split(" ");

    if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
      return res
        .status(401)
        .json(
          "Invalid token format. Token must be in the format 'Bearer <token>'."
        );
    }

    const actualToken = tokenParts[1]; // Lấy phần token thực tế
    // Kiểm tra xem token có nằm trong blacklist không
    if (isTokenBlacklisted(actualToken)) {
      return res
        .status(403)
        .json(message.auth.token.description.failDecodeToken);
    }

    try {
      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res
        .status(403)
        .json(message.auth.token.description.failDecodeToken);
    }
  },
};

module.exports = authMiddleware;
