const { check, validationResult } = require("express-validator");
const message = require("../../config/message.json");

exports.validateUpdateUserRole = [
  check("role")
    .notEmpty()
    .withMessage(message.validation.roleRequired || "Role is required")
    .isIn(["student", "teacher", "admin"])
    .withMessage(
      message.validation.invalidRole ||
        "Role must be one of the following: student, teacher, admin"
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return res.status(400).json({
        success: false,
        title: "Validation Error",
        description: errorMessages,
      });
    }
    next();
  },
];
