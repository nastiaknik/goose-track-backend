const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const HttpError = require("../helpers/HttpError");
const { User } = require("../models/user");
const { asignTokens } = require("../helpers/asignTokens");
const { sendEmail } = require("../helpers/SendGridAPI");

// const { BASE_URL } = process.env;

const signupService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });
  if (fetchedUser) {
    throw new HttpError(409, "User with this email is already in the base");
  }

  const hashPassword = await bcrypt.hash(body.password, 12);

  const verificationToken = crypto.randomUUID();

  const newUser = await User.create({
    ...body,
    password: hashPassword,
    verificationToken,
  });

  await sendEmail(newUser.email, verificationToken);

  return newUser;
};

const verifyUserEmailService = async (verificationToken) => {
  console.log(`Hello from service! verificationToken: ${verificationToken}`);

  const currentUser = await User.findOne({ verificationToken });
  console.log(`Hello from service! currentUser: ${currentUser}`);

  if (!currentUser) {
    throw new HttpError(404, "User is not found");
  }

  console.log(`Hello from service! We are here!`);
  await User.findByIdAndUpdate(currentUser._id, {
    verify: true,
    verificationToken: "",
  });
};

const resendVerifyEmailService = async (body) => {
  const { email } = body;

  const currentUser = await User.findOne({ email });
  if (!currentUser) {
    throw new HttpError(404, "User is not found");
  }

  if (currentUser.verify === true) {
    throw new HttpError(400, "Verification has already been passed");
  }

  await sendEmail(email, currentUser.verificationToken);
};

const loginService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });
  if (!fetchedUser) {
    throw new HttpError(401, "User with this email is not found");
  }

  if (!fetchedUser.verify) {
    throw new HttpError(401, "Email is not verified");
  }

  const isPasswordCorrect = await bcrypt.compare(
    body.password,
    fetchedUser.password
  );
  if (!isPasswordCorrect) {
    throw new HttpError(401, "Password is not correct");
  }

  const { refreshToken, accessToken } = asignTokens(fetchedUser);

  await User.findByIdAndUpdate(fetchedUser._id, {
    refreshToken,
  });

  return {
    user: {
      _id: fetchedUser._id,
      email: fetchedUser.email,
      username: fetchedUser.username,
    },
    accessToken,
  };
};

const logoutService = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

module.exports = {
  signupService,
  verifyUserEmailService,
  resendVerifyEmailService,
  loginService,
  logoutService,
};
