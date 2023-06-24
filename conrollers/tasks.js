const {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
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
const updateTaskController = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedTask = await updateTaskService(id, req.body);
  res.json(updatedTask);
});

const deleteTaskController = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  await deleteTaskService(id);
  res.json({ message: "Task deleted" });
});

module.exports = {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
};
