const express = require("express");
const {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../../conrollers/tasks");
const { authCheck } = require("../../midllewares/authCheck");
const validateBody = require("../../midllewares/validateBody");
const { TaskSchema, SchemaToEditTask } = require("../../schemas/taskSchemas");
const isValidId = require("../../midllewares/isValidId");

const router = express.Router();

router.get("/", authCheck, getAllTasksController);

router.post("/", authCheck, validateBody(TaskSchema), createTaskController);
router.patch(
  "/:id",
  authCheck,
  isValidId,
  validateBody(SchemaToEditTask),
  updateTaskController
);
router.delete("/:id", authCheck, isValidId, deleteTaskController);

module.exports = {
  taskRouter: router,
};
