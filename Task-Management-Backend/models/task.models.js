<<<<<<< HEAD:Task-Management-Backend/models/Task.js
import mongoose from "mongoose";
=======
import mongoose from "mongoose"; 

>>>>>>> main:Task-Management-Backend/models/task.models.js
const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  deadline: { type: Date },
  priority: { type: String, enum: ["Low", "Medium", "High"] },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

<<<<<<< HEAD:Task-Management-Backend/models/Task.js
export default mongoose.model("Task", TaskSchema);
=======
const Task = mongoose.model("Task", TaskSchema);
export default Task;
>>>>>>> main:Task-Management-Backend/models/task.models.js
