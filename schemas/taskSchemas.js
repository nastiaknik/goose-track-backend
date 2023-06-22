const Joi = require("joi");

const TaskSchema = Joi.object({
  title: Joi.string().max(250).required(),
  priority: Joi.string().valid("Low", "Medium", "High").required(),
  start: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .message("Invalid 'time'. Please, use HH:MM string format")
    .required(),
  end: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .message("Invalid 'time'. Please, use HH:MM string format")
    .required(),
  date: Joi.string()
    .pattern(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/)
    .message("Invalid 'date'. Please, use YYYY-MM-DD string format")
    .required(),
  category: Joi.string().valid("To do", "In progress", "Done").required(),
});

module.exports = {
  TaskSchema,
};
