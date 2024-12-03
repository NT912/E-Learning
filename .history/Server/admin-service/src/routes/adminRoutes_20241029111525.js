const express = require("express");
const AdminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const adminValidation = require("../validation/adminValidation");

const router = express.Router();

router.get(
  "/users",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  AdminController.getAllUsers
);

router.get(
  "/users/:userID",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  AdminController.getUserById
);

router.put(
  "/users/:userID/role",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminValidation.validateUpdateUserRole,
  AdminController.updateUserRole
);

router.delete(
  "/users/:userID",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  AdminController.deleteUser
);

module.exports = router;
