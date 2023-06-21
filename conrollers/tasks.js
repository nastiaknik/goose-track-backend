const { getTasksService } = require("../services/taskServices");
const controllerWrapper = require("../helpers/controllerWrapper");

const getAllTasksController = controllerWrapper(async (req, res, next) => {
  const tasks = await getTasksService();
  res.json(tasks);
});

module.exports = {
  getAllTasksController,
};
