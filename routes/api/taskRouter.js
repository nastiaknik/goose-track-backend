const express = require("express");
const {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getMonthTasksController,
  getDayTasksController,
  changeTasksCategoryController,
} = require("../../conrollers/tasks");
const { authCheck } = require("../../midllewares/authCheck");
const validateBody = require("../../midllewares/validateBody");
const {
  TaskSchema,
  SchemaToEditTask,
  SchemaToChangeTask,
} = require("../../schemas/taskSchemas");
const isValidId = require("../../midllewares/isValidId");
const {
  validateMonthAndYear,
  validateDate,
} = require("../../midllewares/isValidDate");

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

router.get(
  "/month/:year-:month",
  authCheck,
  validateMonthAndYear,
  getMonthTasksController
);
router.get(
  "/day/:year-:month-:day",
  authCheck,
  validateDate,
  getDayTasksController
);

router.patch(
  "/category/:id",
  authCheck,
  validateBody(SchemaToChangeTask),
  changeTasksCategoryController
);

module.exports = {
  taskRouter: router,
};
