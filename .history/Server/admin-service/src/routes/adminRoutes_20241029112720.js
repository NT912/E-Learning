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
  AdminController.viewUser
);

/**
 * @swagger
 * /admin/users/{userID}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   description: The user ID
 *                 email:
 *                   type: string
 *                   description: User's email
 *                 role:
 *                   type: string
 *                   description: Role of the user
 *       404:
 *         description: User not found
 */

router.get(
  "/users/:userID",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  AdminController.getUserById
);

/**
 * @swagger
 * /admin/users/{userID}/role:
 *   put:
 *     summary: Update user role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       description: New role for the user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: New role for the user
 *                 enum: [student, teacher, admin]
 *                 example: teacher
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid role provided
 *       404:
 *         description: User not found
 */
router.put(
  "/users/:userID/role",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminValidation.validateUpdateUserRole,
  AdminController.updateUserRole
);

/**
 * @swagger
 * /admin/users/{userID}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
  "/users/:userID",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  AdminController.deleteUser
);

module.exports = router;
