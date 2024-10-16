const jwt = require("jsonwebtoken");
const response = require("../helpers/sendResponse")
const UserModel = require('../models/UserModel'); 
const message = require('../config/message.json'); 

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return response(
        res, 
        false,
        message.auth.token.title,
        message.auth.token.description.missToken
      )
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return response(
          res, 
          false,
          message.auth.token.title,
          message.auth.token.description.userNotFound 
        );
      }
      
      next(); 
    } catch (err) {
      console.log(err);
      return response(
        res, 
        false,
        message.auth.token.title,
        message.auth.token.description.failDecodeToken
      )
    }
  }
}

module.exports = authMiddleware;
