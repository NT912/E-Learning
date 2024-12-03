const AdminModel = require("../models/adminModel");

const AdminService = {
  getAllUsers: async () => {
    return await AdminModel.getAllUsers();
  },

  getUserById: async (userID) => {
    return await AdminModel.getUserById(userID);
  },

  updateUserRole: async (userID, newRole) => {
    return await AdminModel.updateUserRole(userID, newRole);
  },

  deleteUser: async (userID) => {
    return await AdminModel.deleteUser(userID);
  },
};

module.exports = AdminService;
