// profileValidation.js
const { check, validationResult } = require("express-validator");

exports.validateProfileUpdate = [
  check("Email").optional().isEmail().withMessage("Invalid email format"),
  check("PhoneNumber")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number format"),
  check("About")
    .optional()
    .isLength({ max: 255 })
    .withMessage("About section cannot exceed 255 characters"),
  check("AvatarLink")
    .optional()
    .isURL()
    .withMessage("Avatar link must be a valid URL"),
  check("BankName")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Bank name cannot exceed 50 characters"),
  check("BankAccountNumber")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Bank account number cannot exceed 20 characters"),

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
