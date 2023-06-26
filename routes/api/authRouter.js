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
  getUserInfoController,
} = require("../../conrollers/auth");
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

router.post(
  "/user",
  authCheck,
  upload.single("avatar"),
  validateBody(UpdateUserInfoSchema),
  updateUserInfoController
);

router.get("/current", authCheck, getUserInfoController);

module.exports = {
  authRouter: router,
};
