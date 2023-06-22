const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const HttpError = require("../helpers/HttpError");
const { User } = require("../models/user");
// const { asignTokens } = require("../helpers/asignTokens");
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
  const currentUser = await User.findOne({ verificationToken });
  if (!currentUser) {
    throw new HttpError(404, "User is not found");
  }

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

module.exports = {
  signupService,
  verifyUserEmailService,
  resendVerifyEmailService,
};
