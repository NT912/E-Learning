const sendResponse = (res, success, title, description = null, data = {}) => {
  const statusCode = success ? 201 : 400; // Thành công trả về 201, thất bại trả về 400
  res.status(statusCode).json({
    success,
    title,
    description,
    ...data, // Bất kỳ dữ liệu nào cần bổ sung, ví dụ như token
  });
};

module.exports = sendResponse;
