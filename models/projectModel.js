const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamMembers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);
projectSchema.pre("save", function (next) {
  if(this.teamMembers){
    this.teamMembers = [...new Set(this.teamMembers)];
  }
  next();
})
projectSchema.pre("findOneAndUpdate", function (next) {
  if(this._update.teamMembers){
    this._update.teamMembers = [...new Set(this._update.teamMembers)];
  }
  next();
})


const Project = new mongoose.model("Project", projectSchema);
module.exports = Project;
