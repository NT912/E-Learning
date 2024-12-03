const express = require("express");
const AdminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const Role = require("../../config/role");

const router = express.Router();

router.get(
  "/users",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.ADMIN),
  AdminController.getAllUsers
);

router.get(
  "/users/:userID",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.ADMIN),
  AdminController.getUserById
);

router.put(
  "/users/:userID/role",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.ADMIN),
  AdminController.updateUserRole
);

router.delete(
  "/users/:userID",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole(Role.ADMIN),
  AdminController.deleteUser
);

module.exports = router;
