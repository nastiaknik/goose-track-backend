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

const UpdateUserInfoSchema = Joi.object({
  phone: Joi.string()
    .regex(/^(\+)?[\d\s-]+$/)
    .allow(null, ""),
  skype: Joi.string()
    .regex(/^@[a-z0-9_]{1,16}$/)
    .allow(null, ""),
  birthday: Joi.date().iso().max(Date.now()),
  username: Joi.string().max(16).messages({
    "string.max":
      "username length must be less than or equal to 16 characters long",
  }),
  email: Joi.string()
    .email()
    .pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .messages({
      "string.email": "email field must be a valid email",
      "string.pattern.base": "email contains invalide option",
    }),
})
  .or("username", "email", "phone", "skype", "birthday")
  .required();

const UserPasswordRecoverySchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "field 'id' is missing",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "field 'password' is missing",
    "string.min": "password length must be at least 6 characters long",
  }),
});

module.exports = {
  UserRegistrationSchema,
  EmailSchema,
  UserLoginSchema,
  UpdateUserInfoSchema,
  UserPasswordRecoverySchema,
};
