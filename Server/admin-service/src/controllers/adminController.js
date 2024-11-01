const AdminService = require("../services/adminService");
const sendResponse = require("../helpers/sendResponse");
const messages = require("../../config/message.json");

const AdminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await AdminService.getAllUsers();
      return sendResponse(
        res,
        true,
        messages.admin.getAllUsers.success.title,
        messages.admin.getAllUsers.success.description,
        users
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.admin.getAllUsers.error.title,
        messages.admin.getAllUsers.error.description,
        error.message
      );
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userID } = req.params;
      const user = await AdminService.getUserById(userID);
      return sendResponse(
        res,
        true,
        messages.admin.getUserById.success.title,
        messages.admin.getUserById.success.description,
        user
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.admin.getUserById.error.title,
        messages.admin.getUserById.error.description,
        error.message
      );
    }
  },

  updateUserRole: async (req, res) => {
    try {
      const { userID } = req.params;
      const { role } = req.body;
      await AdminService.updateUserRole(userID, role);
      return sendResponse(
        res,
        true,
        messages.admin.updateUserRole.success.title,
        messages.admin.updateUserRole.success.description
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.admin.updateUserRole.error.title,
        messages.admin.updateUserRole.error.description,
        error.message
      );
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userID } = req.params;
      await AdminService.deleteUser(userID);
      return sendResponse(
        res,
        true,
        messages.admin.deleteUser.success.title,
        messages.admin.deleteUser.success.description
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.admin.deleteUser.error.title,
        messages.admin.deleteUser.error.description,
        error.message
      );
    }
  },
};

module.exports = AdminController;
