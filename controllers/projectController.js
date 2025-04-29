const Project = require("../models/projectModel");

const getEngagedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      teamMembers: { $in: [req.user._id] },
    })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email");
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email");
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id)
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createProject = async (req, res) => {
  const { title, description, startDate, endDate, teamMembers } = req.body;
  try {
    const newProject = await Project.create({
      title,
      description,
      startDate,
      endDate,
      createdBy: req.user._id,
      teamMembers,
    });
    return res.status(201).json(newProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, teamMembers } = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        startDate,
        endDate,
        teamMembers,
      },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getEngagedProjects,
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
