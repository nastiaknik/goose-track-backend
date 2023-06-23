const HttpError = require("../helpers/HttpError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();
const { asignTokens } = require("../helpers/asignTokens");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const authCheck = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(new HttpError(401, "Invalid token"));
  }

  let fetchedUser;

  try {
    const decodedPayload = jwt.decode(token);
    fetchedUser = await User.findById(decodedPayload.id);

    if (!fetchedUser || !fetchedUser.refreshToken) {
      return next(
        new HttpError(401, "User is not found or refresh token is unvalid")
      );
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);

    req.user = fetchedUser;

    next();
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      return next(new HttpError(401, err.message));
    }

    try {
      jwt.verify(fetchedUser.refreshToken, REFRESH_TOKEN_SECRET);
      const { accessToken, refreshToken } = asignTokens(fetchedUser);

      await User.findByIdAndUpdate(fetchedUser._id, {
        refreshToken,
      });

      res.status(200).json({
        user: {
          _id: fetchedUser._id,
          username: fetchedUser.username,
          email: fetchedUser.email,
          birthday: fetchedUser.birthday,
          phone: fetchedUser.phone,
          skype: fetchedUser.skype,
        },
        accessToken,
      });
    } catch (err) {
      return next(new HttpError(401, "Refresh token is expired"));
    }
  }
};

module.exports = {
  authCheck,
};
