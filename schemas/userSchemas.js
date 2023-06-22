const Joi = require("joi");

const UserRegistrationSchema = Joi.object({
  username: Joi.string().max(16).required().messages({
    "string.max":
      "username length must be less than or equal to 16 characters long",
    "any.required": "field 'username' is missing",
  }),
  email: Joi.string()
    .email()
    .pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .required()
    .messages({
      "any.required": "field 'email' is missing",
      "string.email": "email field must be a valid email",
      "string.pattern.base": "email contains invalide option",
    }),
  password: Joi.string().min(6).required().messages({
    "any.required": "field 'password' is missing",
    "string.min": "password length must be at least 6 characters long",
  }),
});

const EmailSchema = Joi.object().keys({
  email: UserRegistrationSchema.extract("email"),
});

const UserLoginSchema = Joi.object().keys({
  email: UserRegistrationSchema.extract("email"),
  password: UserRegistrationSchema.extract("password"),
});

module.exports = {
  UserRegistrationSchema,
  EmailSchema,
  UserLoginSchema,
};
