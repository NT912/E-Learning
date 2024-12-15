const { body, validationResult } = require("express-validator");
const message = require("../config/message.json");

/**
 * Validation middleware cho các trường thông tin profile của người dùng
 */
const validateProfileUpdate = [
  // Kiểm tra email hợp lệ
  body("email")
    .optional() // Email là tùy chọn, vì có thể người dùng không thay đổi email
    .isEmail()
    .withMessage(message.validation.email.invalid),

  // Kiểm tra số điện thoại hợp lệ
  body("phoneNumber")
    .optional() // Số điện thoại là tùy chọn
    .isLength({ min: 10, max: 15 })
    .withMessage(message.validation.phoneNumber.invalid),

  // Kiểm tra độ dài của phần giới thiệu
  body("about")
    .optional() // Phần giới thiệu là tùy chọn
    .isLength({ max: 500 })
    .withMessage(message.validation.about.invalidLength),

  // Kiểm tra file avatar (nếu có)
  (req, res, next) => {
    // Nếu có file avatar
    if (req.file) {
      // Kiểm tra định dạng file (chỉ cho phép ảnh)
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          title: "Invalid File Type",
          description: "Only JPG, PNG, and GIF files are allowed for avatar.",
        });
      }
      // Kiểm tra kích thước file (giới hạn 5MB)
      if (req.file.size > 5 * 1024 * 1024) {
        // 5MB
        return res.status(400).json({
          success: false,
          title: "File Size Exceeded",
          description: "File size should not exceed 5MB.",
        });
      }
    }
    next();
  },

  // Middleware để xử lý kết quả của validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        title: "Validation Error",
        description: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  validateProfileUpdate,
};
