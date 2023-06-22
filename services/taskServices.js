// const { HttpError } = require("../helpers/HttpError");
const { Task } = require("../models/task");

const getTasksService = async (userId) => {
  return await Task.find({ owner: userId });
};

const createTaskService = async (data, userId) => {
  return await Task.create({ ...data, owner: userId });
};

module.exports = { getTasksService, createTaskService };
