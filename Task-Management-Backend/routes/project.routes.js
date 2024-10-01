import { Router } from "express";
import { createTask, getTasks } from "../controllers/tasks.controllers.js";
import { deleteProjectById, getProjectById, updateProjectById } from "../controllers/project-controller.js";

const router = Router();

// Define routes for tasks
router.post("/", createTask);
router.get("/", getTasks);

router.get('/:projectId', getProjectById);
router.put('/:projectId', updateProjectById);
router.delete('/:projectId', deleteProjectById);

export default router;
