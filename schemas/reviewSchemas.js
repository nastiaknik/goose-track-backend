const Joi = require("joi");

const reviewsSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(2).max(30).required(),
  comment: Joi.string().required(),
});

module.exports = reviewsSchema;
