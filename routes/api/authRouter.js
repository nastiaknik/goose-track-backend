const express = require("express");
const validateBody = require("../../midllewares/validateBody");
const { UserRegistrationSchema } = require("../../schemas/userSchemas");
const { signupController } = require("../../conrollers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(UserRegistrationSchema),
  signupController
);

module.exports = {
  authRouter: router,
};
