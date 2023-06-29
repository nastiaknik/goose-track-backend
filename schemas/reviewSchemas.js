const Joi = require("joi");

const reviewsAddSchema = Joi.object({
  rating: Joi.number().required().min(0).max(5),
  comment: Joi.string().required().max(300),
});

const reviewsEditSchema = Joi.object({
  rating: Joi.number().min(0).max(5),
  comment: Joi.string().max(300),
})
  .or("rating", "comment", "imgURL")
  .required();

module.exports = { reviewsAddSchema, reviewsEditSchema };
