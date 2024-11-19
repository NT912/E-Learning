const express = require("express");
const AdminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const adminValidation = require("../validation/adminValidation");

const router = express.Router();

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                     description: The user ID
 *                   email:
 *                     type: string
 *                     description: User's email
 *                   role:
 *                     type: string
 *                     description: Role of the user
 *       403:
 *         description: Unauthorized - Only accessible by admin
 */
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
