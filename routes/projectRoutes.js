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
  authenticate,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/engaged", authenticate, getEngagedProjects);
router.get("/", authenticate, getAllProjects);
router.get("/:id", authenticate, getProjectById);
router.post("/", authenticate, authorizeRoles("admin"), createProject);
router.patch("/:id",authenticate,authorizeRoles("admin", "manager"),updateProject);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteProject);

module.exports = router;
