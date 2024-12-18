const { check, validationResult } = require("express-validator");

// Allowed MIME types and max file size
const ALLOWED_MIME_TYPES = [
  "video/mp4", 
  "application/pdf", 
  "application/zip", 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

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
    check("link")
      .optional()
      .isURL()
      .withMessage("Link must be a valid URL."),
    check("file")
      .optional()
      .custom((value, { req }) => {
        if (req.file) {
          if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
            throw new Error("File must be of type MP4, PDF, ZIP, or Word document.");
          }
          if (req.file.size > MAX_FILE_SIZE) {
            throw new Error(`File size must not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
          }
        }
        return true;
      }),
    handleValidationErrors,
  ],
};

module.exports = lessonValidator;
