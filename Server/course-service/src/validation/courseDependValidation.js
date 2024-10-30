// validation/courseDependValidation.js

const { check, validationResult } = require("express-validator");

const courseDependValidation = {
  /**
   * Validation cho việc thêm phụ thuộc khóa học.
   */
  addCourseDepend: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required")
      .isInt({ min: 1 })
      .withMessage("User ID must be a positive integer"),
    check("dependOnCourseID")
      .notEmpty()
      .withMessage("Dependency Course ID is required")
      .isInt({ min: 1 })
      .withMessage("Dependency Course ID must be a positive integer"),
    check("isRequire")
      .notEmpty()
      .withMessage("isRequire is required")
      .isBoolean()
      .withMessage("isRequire must be a boolean value"),

    // Middleware để kiểm tra kết quả của validation
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],

  /**
   * Validation cho việc xóa phụ thuộc khóa học.
   */
  removeCourseDepend: [
    check("userID")
      .notEmpty()
      .withMessage("User ID is required")
      .isInt({ min: 1 })
      .withMessage("User ID must be a positive integer"),

    // Middleware để kiểm tra kết quả của validation
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ]
};

module.exports = courseDependValidation;
