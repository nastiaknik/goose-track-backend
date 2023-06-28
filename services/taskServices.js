const HttpError = require("../helpers/HttpError");
const { Task } = require("../models/task");
const { format } = require("date-fns");

const getTasksService = async (userId) => {
  return await Task.find({ owner: userId });
};

const createTaskService = async (data, userId) => {
  return await Task.create({ ...data, owner: userId });
};

const updateTaskService = async (id, body) => {
  const editedTask = await Task.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!editedTask) {
    throw new HttpError(404, "Not found");
  }
  return editedTask;
};

const deleteTaskService = async (id) => {
  const removedTask = await Task.findByIdAndRemove(id);
  if (!removedTask) {
    throw new HttpError(404, "Not found");
  }
  return removedTask;
};

const getMonthTasksService = async (userId, year, month) => {
  const startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
  const endDate = `${year}-${month.toString().padStart(2, "0")}-${new Date(
    year,
    month,
    0
  ).getDate()}`;
  const tasks = await Task.find({
    owner: userId,
    date: { $gte: startDate, $lte: endDate },
  });
  return tasks;
};

const getDayTasksService = async (userId, year, month, day) => {
  const date = new Date(year, month - 1, day);
  const formattedDate = format(date, "yyyy-MM-dd");
  const tasks = await Task.find({
    owner: userId,
    date: formattedDate,
  });
  return tasks;
};

const changeTasksCategoryService = async (body, id) => {
  const changeTasksCategory = await Task.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!changeTasksCategory) {
    throw new HttpError(404, "Not found");
  }
  return changeTasksCategory;
};

module.exports = {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getMonthTasksService,
  getDayTasksService,
  changeTasksCategoryService,
};
