const { check, validationResult } = require("express-validator");

const validateDiscussion = async (req, res, next) => {
  const { courseID } = req.params;
  const { userID } = req.body;

  const isCourseValid = await discussionService.verifyCourseID(courseID);
  const isUserValid = await discussionService.verifyUserID(userID);

  if (!isCourseValid) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid CourseID." });
  }

  if (!isUserValid) {
    return res.status(404).json({ success: false, message: "Invalid UserID." });
  }

  next();
};

exports.validateDiscussionContent = [
  check("content").notEmpty().withMessage("Content cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        title: "Validation Error",
        description: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    next();
  },
];

exports.validateReplyContent = [
  check("content").notEmpty().withMessage("Reply content cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        title: "Validation Error",
        description: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    next();
  },
];
