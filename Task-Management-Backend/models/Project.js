const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, // Added description field
});

module.exports = mongoose.model("Project", ProjectSchema);
