// const { HttpError } = require("../helpers/HttpError");
const { Task } = require("../models/task");

const getTasksService = async (id) => {
  return await Task.find({ owner: id });
};

module.exports = { getTasksService };
