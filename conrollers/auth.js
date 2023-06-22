const controllerWrapper = require("../helpers/controllerWrapper");
const {
  signupService,
  verifyUserEmailService,
  resendVerifyEmailService,
  loginService,
  logoutService,
} = require("../services/authServices");

const { FRONTEND_REDIR_URL } = process.env;

const signupController = controllerWrapper(async (req, res, next) => {
  const newUser = await signupService(req.body);
  res.status(201).json(newUser);
});

const activationController = controllerWrapper(async (req, res, next) => {
  const { verificationToken } = req.params;
  await verifyUserEmailService(verificationToken);
  res.status(200).redirect(FRONTEND_REDIR_URL);
});

const resendActivatinEmailController = controllerWrapper(
  async (req, res, next) => {
    await resendVerifyEmailService(req.body);
    res.status(200).json({ message: "Verification email is sent" });
  }
);

const loginController = controllerWrapper(async (req, res, next) => {
  const { user, accessToken } = await loginService(req.body);
  res.status(200).json({ user, accessToken });
});

const logoutController = controllerWrapper(async (req, res, next) => {
  const userId = req.user._id;
  await logoutService(userId);
  res.status(200).json({ message: "Logout was successful" });
});

module.exports = {
  signupController,
  activationController,
  resendActivatinEmailController,
  loginController,
  logoutController,
};
