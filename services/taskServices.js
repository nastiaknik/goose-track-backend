const HttpError = require("../helpers/HttpError");
const { Task } = require("../models/task");

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

module.exports = {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
