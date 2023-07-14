const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  RECOVERY_ID_SECRET,
  RECOVERY_ID_EXPIRES_IN,
} = process.env;

const asignTokens = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const asignRecoveryId = (user) => {
  const payload = {
    id: user._id,
  };

  const recoveryId = jwt.sign(payload, RECOVERY_ID_SECRET, {
    expiresIn: RECOVERY_ID_EXPIRES_IN,
  });

  return {
    recoveryId,
  };
};
module.exports = {
  asignTokens,
  asignRecoveryId,
};
