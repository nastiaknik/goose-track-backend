const express = require("express");
const { getAllTasksController } = require("../../conrollers/tasks");
const { authCheck } = require("../../midllewares/authCheck");

const router = express.Router();

router.get("/", authCheck, getAllTasksController);

module.exports = {
  taskRouter: router,
};
