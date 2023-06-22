const controllerWrapper = require("../helpers/controllerWrapper");
const {
  signupService,
  verifyUserEmailService,
  resendVerifyEmailService,
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

module.exports = {
  signupController,
  activationController,
  resendActivatinEmailController,
};
