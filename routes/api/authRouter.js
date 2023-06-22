const express = require("express");
const validateBody = require("../../midllewares/validateBody");
const {
  UserRegistrationSchema,
  EmailSchema,
} = require("../../schemas/userSchemas");
const {
  signupController,
  activationController,
  resendActivatinEmailController,
} = require("../../conrollers/auth");

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

// router.post("/login");
// router.post("/logout");
// router.get("/refresh");
// router.patch("/userdata");

module.exports = {
  authRouter: router,
};
