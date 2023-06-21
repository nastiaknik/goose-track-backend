const controllerWrapper = require("../helpers/controllerWrapper");
const { signupService } = require("../services/authServices");

const signupController = controllerWrapper(async (req, res, next) => {
  const newUser = await signupService(req.body);
  res.status(201).json(newUser);
});

module.exports = {
  signupController,
};
