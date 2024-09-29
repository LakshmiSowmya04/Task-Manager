import express from "express"
import Project from "../models/Project.js"
const router = express.Router();

router.post("/", async (req, res) => {
  const project = new Project(req.body);
  console.log(req.body);
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

export default router;