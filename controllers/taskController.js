const Task = require("../models/taskModel");
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } =
      req.body;
    const { projectId } = req.params;

    if (!title || !projectId) {
      return res
        .status(400)
        .json({ message: "Title and project ID are required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      project: projectId,
      createdBy: req.user._id,
    });

    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "name email")
      .populate("project", "title description")
      .sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate, assignedTo } =
      req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        status,
        priority,
        dueDate,
        assignedTo,
      },{ runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(taskId)
      .populate("assignedTo", "name email")
      .populate("project", "title description");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// const addComment = async (req, res) =>{
//     try {
//         const { taskId } = req.params;
//         const { comment } = req.body;
    
//         if (!taskId) {
//         return res.status(400).json({ message: "Task ID is required" });
//         }
    
//         if (!comment) {
//         return res.status(400).json({ message: "Comment is required" });
//         }
    
//         const task = await Task.findByIdAndUpdate(
//         taskId,
//         {
//             $push: {
//             comments: {
//                 comment,
//                 createdBy: req.user._id,
//             },
//             },
//         },
//         );
//         if (!task) {
//         return res.status(404).json({ message: "Task not found" });
//         }
    
//         return res.status(200).json({ message: "Comment added successfully", task });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }       
// const deleteComment = async (req, res) => {
//     try {
//         const { taskId, commentId } = req.params;
    
//         if (!taskId || !commentId) {
//         return res.status(400).json({ message: "Task ID and Comment ID are required" });
//         }
    
//         const task = await Task.findByIdAndUpdate(
//         taskId,
//         {
//             $pull: {
//             comments: { _id: commentId },
//             },
//         },
//         );
    
//         if (!task) {
//         return res.status(404).json({ message: "Task not found" });
//         }
    
//         return res.status(200).json({ message: "Comment deleted successfully", task });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById
};
