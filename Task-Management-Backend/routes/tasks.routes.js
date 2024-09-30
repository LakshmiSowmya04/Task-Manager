// tasks.routes.js
import { Router } from "express"; 
import { createTask, getTasksByProject } from "../controllers/tasks.controllers.js";

const router = Router();

// Route to create a new task
router.post('/', createTask);

// Route to get tasks by project ID
router.get('/project/:projectId', getTasksByProject);

export default router;
