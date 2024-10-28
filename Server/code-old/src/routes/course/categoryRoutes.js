const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");
const Role = require("../../../config/data/role");
const CategoryController = require("../../controllers/course/categoryController");

/*
Category Routes
*/
/**
 * @swagger
 * /course/category/add:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Category added successfully
 *       400:
 *         description: Error adding category
 */
router.post("/add", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.ADMIN), CategoryController.create);
/**
 * @swagger
 * /course/category/{categoryID}/update:
 *   post:
 *     summary: Update category information
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Error updating category
 */
router.post("/:categoryID/update", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.ADMIN), CategoryController.update);
router.post("/:categoryID/delete", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.ADMIN), CategoryController.delete);
router.get("/getall", authMiddleware.verifyToken, CategoryController.getAll);

module.exports = router;
 