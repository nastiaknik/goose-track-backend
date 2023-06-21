const express = require("express");
const { getAllTasksController } = require("../../conrollers/tasks");
const authenticate = require("../../midllewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getAllTasksController);

module.exports = {
  taskRouter: router,
};
