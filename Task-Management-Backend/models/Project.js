const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Project", ProjectSchema);
