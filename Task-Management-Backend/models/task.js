import mongoose from "mongoose"; 

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  deadline: { type: Date },
  priority: { type: String, enum: ["Low", "Medium", "High"] },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;