const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");
const categoryOfCourseController = require("../../controllers/course/categoryOfCourseController");

/*
CategoryOfCourse Routes
*/
router.post("/:courseID/add-categories", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), categoryOfCourseController.addCategoriesToCourse);
router.post("/:courseID/remove-category/:categoryID", authMiddleware.verifyToken, roleMiddleware.checkRole(Role.TEACHER), categoryOfCourseController.removeCategoryFromCourse);
router.get("/:courseID/categories", authMiddleware.verifyToken, categoryOfCourseController.getCategoriesOfCourse);

module.exports = router;
