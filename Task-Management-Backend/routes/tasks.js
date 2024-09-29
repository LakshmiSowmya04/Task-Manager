import express from "express";
import dotenv from "dotenv";

import Task from "../models/Task.js"
const router = express.Router();
dotenv.config();

router.post("/", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  const tasks = await Task.find().populate("project");
  res.send(tasks);
});

export default router;
