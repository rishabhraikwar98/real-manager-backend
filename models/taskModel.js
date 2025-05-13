const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["TO DO", "IN PROGRESS", "DONE"],
      default: "TO DO",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    // commments: {
    //   type: [
    //     {
    //       comment: {
    //         type: String,
    //         minlength: [3, "Comment must be at least 3 characters"],
    //         maxlength: [500, "Comment cannot exceed 500 characters"],
    //         trim: true,
    //       },
    //       createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //       createdAt: { type: Date, default: Date.now },
    //     },
    //   ],
    //   default: [],
    // },
  },
  { timestamps: true }
);

const Task = new mongoose.model("Task", taskSchema);
module.exports = Task;
