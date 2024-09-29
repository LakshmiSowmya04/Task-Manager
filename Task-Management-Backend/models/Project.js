import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, // Added description field
});

export default mongoose.model("Project", ProjectSchema);