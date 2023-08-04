const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User } = require("../models/user");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/google/callback`,
  pasReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshTocken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;
    const registredUser = await User.findOne({ email });

    if (registredUser) {
      return done(null, registredUser);
    }

    const password = crypto.randomUUID();
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      username: displayName,
      password: hashPassword,
      verificationToken: "",
      verify: true,
    });

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = {
  passport,
};
