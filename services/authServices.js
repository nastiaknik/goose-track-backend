const bcrypt = require("bcrypt");
const crypto = require("crypto");

const HttpError = require("../helpers/HttpError");
const { User } = require("../models/user");
const { asignTokens } = require("../helpers/asignTokens");
const { sendEmail } = require("../helpers/SendGridAPI");

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

  return {
    username: newUser.username,
    email: newUser.email,
    _id: newUser._id,
  };
};

const verifyUserEmailService = async (verificationToken) => {
  const currentUser = await User.findOne({ verificationToken });

  if (!currentUser) {
    throw new HttpError(404, "User is not found");
  }

  if (currentUser.updatedEmail) {
    await User.findByIdAndUpdate(currentUser._id, {
      email: currentUser.updatedEmail,
      verify: true,
      verificationToken: "",
      updatedEmail: "",
      refreshToken: "",
    });
  } else {
    await User.findByIdAndUpdate(currentUser._id, {
      verify: true,
      verificationToken: "",
    });
  }
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
  let fetchedUser;

  try {
    fetchedUser = await User.findOne({ email: body.email });
    if (!fetchedUser) {
      throw new HttpError(401, "Email or password is not correct");
    }

    if (!fetchedUser.verify && !fetchedUser.updatedEmail) {
      throw new HttpError(401, "Email is not verified");
    }
  } catch (err) {
    if (err.message === "Email or password is not correct") {
      fetchedUser = await User.findOne({ updatedEmail: body.email });
      if (!fetchedUser) {
        throw new HttpError(401, "Email or password is not correct");
      }

      if (!fetchedUser.verify && fetchedUser.updatedEmail) {
        throw new HttpError(401, "Email is not verified");
      }
    }
  }

  const isPasswordCorrect = await bcrypt.compare(
    body.password,
    fetchedUser.password
  );
  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password is not correct");
  }

  const { refreshToken, accessToken } = asignTokens(fetchedUser);

  await User.findByIdAndUpdate(fetchedUser._id, {
    refreshToken,
  });

  return {
    user: {
      _id: fetchedUser._id,
      username: fetchedUser.username,
      email: fetchedUser.email,
      birthday: fetchedUser.birthday,
      phone: fetchedUser.phone,
      skype: fetchedUser.skype,
      imgURL: fetchedUser.imgURL,
    },
    accessToken,
  };
};

const logoutService = async (userId) => {
  const fetchedUser = await User.findById(userId);
  if (!fetchedUser) {
    throw new HttpError(401, "User with this id is not found");
  }

  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const refreshService = async (userId) => {
  const fetchedUser = await User.findById(userId);
  if (!fetchedUser) {
    throw new HttpError(401, "User with this id is not found");
  }

  return {
    user: {
      _id: fetchedUser._id,
      username: fetchedUser.username,
      email: fetchedUser.email,
      birthday: fetchedUser.birthday,
      phone: fetchedUser.phone,
      skype: fetchedUser.skype,
      imgURL: fetchedUser.imgURL,
      updatedEmail: fetchedUser.updatedEmail,
    },
  };
};

const updateUserInfoService = async (userId, body) => {
  const fetchedUser = await User.findById(userId);
  if (!fetchedUser) {
    throw new HttpError(401, "User with this id is not found");
  }

  let updatedUser;

  if (fetchedUser.email !== body.email) {
    const otherUser = await User.findOne({ email: body.email });
    if (otherUser) {
      throw new HttpError(409, "User with this email is already in the base");
    }

    const verificationToken = crypto.randomUUID();

    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...body,
        updatedEmail: body.email,
        email: fetchedUser.email,
        verificationToken,
        verify: false,
      },
      { new: true }
    );

    await sendEmail(body.email, verificationToken);
  } else {
    updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...body },
      { new: true }
    );
  }

  return {
    user: {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      birthday: updatedUser.birthday,
      phone: updatedUser.phone,
      skype: updatedUser.skype,
      imgURL: updatedUser.imgURL,
      updatedEmail: updatedUser.updatedEmail,
    },
  };
};

module.exports = {
  signupService,
  verifyUserEmailService,
  resendVerifyEmailService,
  loginService,
  logoutService,
  refreshService,
  updateUserInfoService,
};
