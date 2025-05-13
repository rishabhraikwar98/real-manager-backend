const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");

const { authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:projectId/tasks",authorizeRoles("admin", "manager"),createTask);
router.get("/:projectId/tasks", getTasks);
router.get("/:projectId/tasks/:taskId", getTaskById);
router.patch("/:projectId/tasks/:taskId", updateTask);
router.delete("/:projectId/tasks/:taskId", authorizeRoles("admin", "manager"), deleteTask);

module.exports = router;
