const express = require("express");
const courseController = require("~/controllers/courseController");
const { verifyToken } = require("~/middleware/authMiddleware");

const router = express.Router();

router.post("/create", courseController.createCourse);
router.post("/update/title", courseController.updateCourseTitle);

<<<<<<< HEAD
export default router;
=======
module.exports = router;
>>>>>>> a337f2627bc37470211f6fe5158cb22521318015
