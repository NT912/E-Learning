const AdminService = require("../services/adminService");
const sendResponse = require("../helpers/sendResponse");

const AdminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await AdminService.getAllUsers();
      return sendResponse(res, true, "Fetched users successfully", users);
    } catch (error) {
      return sendResponse(res, false, "Failed to fetch users", error.message);
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userID } = req.params;
      const user = await AdminService.getUserById(userID);
      return sendResponse(res, true, "Fetched user successfully", user);
    } catch (error) {
      return sendResponse(res, false, "Failed to fetch user", error.message);
    }
  },

  updateUserRole: async (req, res) => {
    try {
      const { userID } = req.params;
      const { role } = req.body;
      await AdminService.updateUserRole(userID, role);
      return sendResponse(res, true, "User role updated successfully");
    } catch (error) {
      return sendResponse(
        res,
        false,
        "Failed to update user role",
        error.message
      );
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userID } = req.params;
      await AdminService.deleteUser(userID);
      return sendResponse(res, true, "User deleted successfully");
    } catch (error) {
      return sendResponse(res, false, "Failed to delete user", error.message);
    }
  },
};

module.exports = AdminController;
