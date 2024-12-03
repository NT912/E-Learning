const { check, validationResult } = require("express-validator");

exports.validateUpdateUserRole = [
  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["student", "teacher", "admin"])
    .withMessage("Role must be one of the following: student, teacher, admin"),

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
