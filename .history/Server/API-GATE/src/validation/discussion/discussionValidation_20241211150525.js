const Joi = require("joi");

// Xác thực nội dung thảo luận (create và update)
const validateDiscussionContent = (req, res, next) => {
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

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Xác thực nội dung trả lời (create và update)
const validateReplyContent = (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().min(3).required().messages({
      "string.base": "Content must be a string",
      "string.empty": "Content cannot be empty",
      "string.min": "Content must be at least 3 characters long",
      "any.required": "Content is required",
    }),
    discussionId: Joi.string().required().messages({
      "string.base": "Discussion ID must be a string",
      "any.required": "Discussion ID is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateDiscussionContent,
  validateReplyContent,
};
