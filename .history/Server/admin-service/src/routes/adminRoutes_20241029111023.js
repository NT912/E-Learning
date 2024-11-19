const express = require("express");
const AdminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const Role = require("../../config/role");

const router = express.Router();

// Route để lấy tất cả người dùng
router.get(
  "/users",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.ADMIN),
  AdminController.getAllUsers
);

// Route để lấy thông tin người dùng theo ID
router.get(
  "/users/:userID",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.ADMIN),
  AdminController.getUserById
);

// Route để cập nhật vai trò người dùng
router.put(
  "/users/:userID/role",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.ADMIN),
  AdminController.updateUserRole
);

// Route để xóa người dùng
router.delete(
  "/users/:userID",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.ADMIN),
  AdminController.deleteUser
);

module.exports = router;
