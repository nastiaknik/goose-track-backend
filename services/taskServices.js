// const { HttpError } = require("../helpers/HttpError");
const { Task } = require("../models/task");

const getTasksService = async () => {
  return await Task.find({});
};

module.exports = { getTasksService };
