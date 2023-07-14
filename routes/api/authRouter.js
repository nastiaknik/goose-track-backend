const express = require("express");
const validateBody = require("../../midllewares/validateBody");
const {
  UserRegistrationSchema,
  EmailSchema,
  UserLoginSchema,
  UpdateUserInfoSchema,
} = require("../../schemas/userSchemas");
const {
  signupController,
  activationController,
  resendActivatinEmailController,
  loginController,
  logoutController,
  refreshController,
  updateUserInfoController,
  sendRecoveryEmailController,
} = require("../../controllers/auth");
const upload = require("../../midllewares/upload");

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

router.patch(
  "/user",
  authCheck,
  upload.single("photo"),
  validateBody(UpdateUserInfoSchema),
  updateUserInfoController
);

router
  .route("/recovery")
  .post(validateBody(EmailSchema), sendRecoveryEmailController);

module.exports = {
  authRouter: router,
};
