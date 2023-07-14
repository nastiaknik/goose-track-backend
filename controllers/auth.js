const controllerWrapper = require("../helpers/controllerWrapper");
const {
  signupService,
  verifyUserEmailService,
  resendVerifyEmailService,
  loginService,
  logoutService,
  refreshService,
  updateUserInfoService,
  sendRecoveryEmailService,
} = require("../services/authServices");
const { User } = require("../models/user");
const cloudinaryImgSave = require("../helpers/cloudinary/cloudinary");

const { FRONTEND_BASE_URL } = process.env;

const signupController = controllerWrapper(async (req, res, next) => {
  const newUser = await signupService(req.body);
  res.status(201).json(newUser);
});

const activationController = controllerWrapper(async (req, res, next) => {
  const { verificationToken } = req.params;
  const { accessToken } = await verifyUserEmailService(verificationToken);
  res
    .status(200)
    .cookie("access_token", `${accessToken}`, {
      expires: new Date(Date.now() + 3600000), // cookie will be removed after 1 hour
    })
    .redirect(`${FRONTEND_BASE_URL}/login`);
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

const refreshController = controllerWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const currentUser = await refreshService(userId);
  res.status(200).json(currentUser);
});

const updateUserInfoController = controllerWrapper(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { file } = req;

  if (file) {
    const avatar = await cloudinaryImgSave(file, {}, "avatars");

    await User.findByIdAndUpdate(userId, { imgURL: avatar.secure_url });
  }
  const updatedUser = await updateUserInfoService(userId, req.body);
  res.status(200).json(updatedUser);
});

const sendRecoveryEmailController = controllerWrapper(
  async (req, res, next) => {
    await sendRecoveryEmailService(req.body);
    res.status(200).json({ message: "Recovery email is sent" });
  }
);

module.exports = {
  signupController,
  activationController,
  resendActivatinEmailController,
  loginController,
  logoutController,
  refreshController,
  updateUserInfoController,
  sendRecoveryEmailController,
};
