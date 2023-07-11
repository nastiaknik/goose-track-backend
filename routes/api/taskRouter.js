const express = require("express");
const {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getMonthTasksController,
  getDayTasksController,
  changeTasksCategoryController,
} = require("../../controllers/tasks");
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

router
  .route("/")
  .get(authCheck, getAllTasksController)
  .post(authCheck, validateBody(TaskSchema), createTaskController);

router
  .route("/:id")
  .patch(
    authCheck,
    isValidId,
    validateBody(SchemaToEditTask),
    updateTaskController
  )
  .delete(authCheck, isValidId, deleteTaskController);

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
