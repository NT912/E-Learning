const express = require("express");
const router = express.Router();

const outcomeController = require("../../controllers/course/outcomeController");
const authMiddleware = require("../../middleware/authMiddleware");
const outcomeValidator = require("../../validation/outcomeValidation");

const roleMiddleware = require("../../middleware/roleMiddleware");
const Role = require("../../../config/data/role");

/*
Outcome
*/
/**
 * @swagger
 * /course/outcome/create/{courseID}:
 *   post:
 *     summary: Create a new outcome for a course
 *     tags: [Outcome]
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         description: ID of the course to add the outcome to
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       201:
 *         description: Outcome created successfully
 *       400:
 *         description: Error creating outcome
 */
router.post("/create/:courseID", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), outcomeController.create);
/**
 * @swagger
 * /course/outcome/{outcomeID}/update/name:
 *   post:
 *     summary: Update the name of an outcome
 *     tags: [Outcome]
 *     parameters:
 *       - in: path
 *         name: outcomeID
 *         required: true
 *         description: ID of the outcome to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The updated name for the outcome
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new name of the outcome
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       200:
 *         description: Outcome name updated successfully
 *       400:
 *         description: Error updating outcome name
 */
router.post("/:outcomeID/update/name", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), outcomeValidator.update, outcomeController.update);
/**
 * @swagger
 * /outcome/{outcomeID}/delete:
 *   post:
 *     summary: Delete an outcome
 *     tags: [Outcome]
 *     parameters:
 *       - in: path
 *         name: outcomeID
 *         required: true
 *         description: ID of the outcome to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # Yêu cầu token trong header Authorization
 *     responses:
 *       200:
 *         description: Outcome deleted successfully
 *       400:
 *         description: Error deleting outcome
 */
router.post("/:outcomeID/delete", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), outcomeController.delete);

module.exports = router;
