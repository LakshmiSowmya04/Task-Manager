import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  name: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  deadline: { type: Date },
  priority: { type: String, enum: ["Low", "Medium", "High"] },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

export default model("Task", TaskSchema);
