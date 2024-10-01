import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default model("Project", ProjectSchema);
