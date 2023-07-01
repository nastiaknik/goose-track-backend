const {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getMonthTasksService,
  getDayTasksService,
  changeTasksCategoryService,
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
  res.json({ message: "Task deleted", id });
});

const getMonthTasksController = controllerWrapper(async (req, res) => {
  const { year, month } = req.params;
  const userId = req.user._id;
  const tasksByMonth = await getMonthTasksService(userId, year, month);
  res.json(tasksByMonth);
});

const getDayTasksController = controllerWrapper(async (req, res) => {
  const { year, month, day } = req.params;
  const userId = req.user._id;
  const tasksByDay = await getDayTasksService(userId, year, month, day);
  res.json(tasksByDay);
});

const changeTasksCategoryController = controllerWrapper(
  async (req, res, next) => {
    const { id } = req.params;
    const changeTasksController = await changeTasksCategoryService(
      req.body,
      id
    );
    res.status(200).json(changeTasksController);
  }
);

module.exports = {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getMonthTasksController,
  getDayTasksController,
  changeTasksCategoryController,
};
