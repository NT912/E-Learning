const sendResponse = (res, success, title, description = null, data = null) => {
  res.status(success ? 201 : 400).send({
    success,
    title,
    description,
    data,
  });
};

module.exports = sendResponse;
