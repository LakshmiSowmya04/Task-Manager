const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  deadline: { type: Date },
  priority: { type: String, enum: ["Low", "Medium", "High"] },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

module.exports = mongoose.model("Task", TaskSchema);
