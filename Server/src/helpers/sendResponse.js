const sendResponse = (res, success, title, description = null, data = {}) => {
  const statusCode = success ? 201 : 400;
  res.status(statusCode).json({
    success,
    title,
    description,
    ...data,
  });
};

module.exports = sendResponse;
