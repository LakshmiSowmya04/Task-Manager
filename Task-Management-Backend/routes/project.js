const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

router.post("/", async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

module.exports = router;
