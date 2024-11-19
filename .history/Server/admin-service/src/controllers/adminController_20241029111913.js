const adminService = require("../services/adminService");
const sendResponse = require("../helpers/sendResponse");
const messages = require("../../config/message.json");

const adminController = {
  viewUser: async (req, res) => {
    try {
      const user = await adminService.viewUser(req.params.userId);
      if (!user) {
        return sendResponse(
          res,
          false,
          messages.admin.viewUserError.title,
          messages.auth.token.description.userNotFound
        );
      }
      return sendResponse(
        res,
        true,
        messages.admin.viewUserSuccess.title,
        messages.admin.viewUserSuccess.description,
        user
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.admin.viewUserError.title,
        messages.admin.viewUserError.description
      );
    }
  },

  updateUserRole: async (req, res) => {
    try {
      const result = await adminService.updateUserRole(
        req.params.userId,
        req.body.role
      );
      return sendResponse(
        res,
        true,
        messages.admin.updateUserRoleSuccess.title,
        messages.admin.updateUserRoleSuccess.description,
        result
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.admin.updateUserRoleError.title,
        messages.admin.updateUserRoleError.description
      );
    }
  },

  deleteUser: async (req, res) => {
    try {
      await adminService.deleteUser(req.params.userId);
      return sendResponse(
        res,
        true,
        messages.admin.deleteUserSuccess.title,
        messages.admin.deleteUserSuccess.description
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.admin.deleteUserError.title,
        messages.admin.deleteUserError.description
      );
    }
  },
};

module.exports = adminController;
