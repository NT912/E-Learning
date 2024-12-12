const multer = require("multer");

// Sử dụng memoryStorage để lưu trữ file trong bộ nhớ tạm thời
const storage = multer.memoryStorage();

// Khởi tạo multer với cấu hình lưu trữ bộ nhớ
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn kích thước file là 10MB
});

// Export middleware xử lý file
module.exports = upload;
