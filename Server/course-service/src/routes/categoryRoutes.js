const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categoryController");
const categoryValidator = require("../validation/categoryValidation");

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
 *     requestBody:
 *       description: Details of the category to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               description:
 *                 type: string
 *                 description: Description of the category
 *     responses:
 *       201:
 *         description: Category added successfully
 *       400:
 *         description: Error adding category
 */
router.post("/add", categoryValidator.create, CategoryController.create);

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
 *     requestBody:
 *       description: Updated details of the category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the category
 *               description:
 *                 type: string
 *                 description: Updated description of the category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Error updating category
 */
router.post("/:categoryID/update", categoryValidator.update, CategoryController.update);

/**
 * @swagger
 * /course/category/{categoryID}/delete:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Error deleting category
 */
router.delete("/:categoryID/delete", CategoryController.delete);

/**
 * @swagger
 * /course/category/getall:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryID:
 *                     type: integer
 *                     description: ID of the category
 *                   name:
 *                     type: string
 *                     description: Name of the category
 *                   description:
 *                     type: string
 *                     description: Description of the category
 *       400:
 *         description: Error retrieving categories
 */
router.get("/getall", CategoryController.getAll);

module.exports = router;
