// const { HttpError } = require("../helpers/HttpError");
const { Task } = require("../models/task");

const getTasksService = async (userId) => {
  return await Task.find({ owner: userId });
};

module.exports = { getTasksService };
