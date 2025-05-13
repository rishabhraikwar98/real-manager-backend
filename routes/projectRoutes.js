const express = require("express");
const {
  getEngagedProjects,
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const {
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/engaged", getEngagedProjects);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", authorizeRoles("admin"), createProject);
router.patch("/:id", authorizeRoles("admin", "manager"), updateProject);
router.delete("/:id", authorizeRoles("admin"), deleteProject);

module.exports = router;
