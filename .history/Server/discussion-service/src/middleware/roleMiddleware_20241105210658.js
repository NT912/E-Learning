const messages = require("../../config/message.json");

const roleMiddleware = {
  checkRole: (requiredRole) => (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        title: messages.permission.title,
        description: messages.permission.description.feature,
      });
    }
    next();
  },
};

module.exports = roleMiddleware;
