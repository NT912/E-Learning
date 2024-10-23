const jwt = require("jsonwebtoken");
const message = require('../config/message.json');

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json(
        message.auth.token.description.missToken
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json(
        message.auth.token.description.failDecodeToken
      );
    }
  }
};

module.exports = authMiddleware;
