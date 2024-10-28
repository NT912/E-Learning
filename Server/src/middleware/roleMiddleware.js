const response = require("../helpers/sendResponse")
const message = require('../../config/message.json'); 

const roleMiddleware = {
  checkRole: (requiredRole) => {
    return (req, res, next) => {
      const user = req.user; 
      if (user.role !== requiredRole) {
        return response(
          res,
          false,
          message.permission.title,
          message.permission.description.feature,
        )
      }
      next();
    };
  },
};

module.exports = roleMiddleware;
