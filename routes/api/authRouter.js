const express = require("express");
const validateBody = require("../../midllewares/validateBody");
const {
  UserRegistrationSchema,
  EmailSchema,
  UserLoginSchema,
} = require("../../schemas/userSchemas");
const {
  signupController,
  activationController,
  resendActivatinEmailController,
  loginController,
  logoutController,
  refreshController,
} = require("../../conrollers/auth");

const { authCheck } = require("../../midllewares/authCheck");

const router = express.Router();

router.post(
  "/register",
  validateBody(UserRegistrationSchema),
  signupController
);

router.get("/activate/:verificationToken", activationController);

router
  .route("/activate")
  .post(validateBody(EmailSchema), resendActivatinEmailController);

router.post("/login", validateBody(UserLoginSchema), loginController);

router.post("/logout", authCheck, logoutController);

router.get("/refresh", authCheck, refreshController);

module.exports = {
  authRouter: router,
};
