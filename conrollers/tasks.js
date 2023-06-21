const { getTasksService } = require("../services/taskServices");
const controllerWrapper = require("../helpers/controllerWrapper");

const getAllTasksController = controllerWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const tasks = await getTasksService(userId);
  res.json(tasks);
});

module.exports = {
  getAllTasksController,
};
