const Joi = require("joi");

// Xác thực thông tin tạo thảo luận
const createDiscussionValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title cannot be empty",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title must be less than 100 characters",
      "any.required": "Title is required",
    }),
    description: Joi.string().min(10).required().messages({
      "string.base": "Description must be a string",
      "string.empty": "Description cannot be empty",
      "string.min": "Description must be at least 10 characters long",
      "any.required": "Description is required",
    }),
    courseId: Joi.string().required().messages({
      "string.base": "Course ID must be a string",
      "any.required": "Course ID is required",
    }),
  });

  return schema.validate(data);
};

// Xác thực thông tin cập nhật thảo luận
const updateDiscussionValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).optional().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title cannot be empty",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title must be less than 100 characters",
    }),
    description: Joi.string().min(10).optional().messages({
      "string.base": "Description must be a string",
      "string.empty": "Description cannot be empty",
      "string.min": "Description must be at least 10 characters long",
    }),
  });

  return schema.validate(data);
};

module.exports = {
  createDiscussionValidation,
  updateDiscussionValidation,
};
