const express = require("express");
const {
  getAllTasksController,
  createTaskController,
} = require("../../conrollers/tasks");
const { authCheck } = require("../../midllewares/authCheck");
const validateBody = require("../../midllewares/validateBody");
const { TaskSchema } = require("../../schemas/taskSchemas");

const router = express.Router();

router.get("/", authCheck, getAllTasksController);
router.post("/", authCheck, validateBody(TaskSchema), createTaskController);

module.exports = {
  taskRouter: router,
};
