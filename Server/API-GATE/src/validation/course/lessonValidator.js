const { check, validationResult } = require("express-validator");

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => err.msg).join(", "),
    });
  }
  next();
};

// Validators
const lessonValidator = {
  updateLesson: [
    check("title")
      .notEmpty()
      .withMessage("Title is required.")
      .isLength({ max: 255 })
      .withMessage("Title must not exceed 255 characters."),
    check("description")
      .optional()
      .isString()
      .withMessage("Description must be a string."),
    check("file")
      .optional()
      .custom((value, { req }) => {
        if (req.file && !["video/mp4", "application/pdf", "application/zip", "application/msword"].includes(req.file.mimetype)) {
          throw new Error("File must be of type video, PDF, ZIP, or Word document.");
        }
        return true;
      }),
    check("link")
      .optional()
      .isURL()
      .withMessage("Link must be a valid URL."),
    handleValidationErrors,
  ],
};

module.exports = lessonValidator;
