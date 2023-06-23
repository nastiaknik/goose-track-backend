const {
  getTasksService,
  createTaskService,
} = require("../services/taskServices");
const controllerWrapper = require("../helpers/controllerWrapper");

const getAllTasksController = controllerWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const tasks = await getTasksService(userId);
  res.json(tasks);
});

const createTaskController = controllerWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const newTask = await createTaskService(req.body, userId);
  res.status(201).json(newTask);
});

module.exports = {
  getAllTasksController,
  createTaskController,
};
