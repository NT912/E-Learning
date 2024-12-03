const { check, validationResult } = require("express-validator");

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
