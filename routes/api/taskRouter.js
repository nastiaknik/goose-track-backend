const express = require("express");
const { getAllTasksController } = require("../../conrollers/tasks");
const router = express.Router();

router.get("/", getAllTasksController);

module.exports = {
  taskRouter: router,
};
