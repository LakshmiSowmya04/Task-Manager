import { Router } from "express"; 
import { createTask, getTasks } from "../controllers/tasks.controllers.js";

const router = Router();

// Define routes for tasks
router.post("/", createTask); // POST route for creating a task
router.get("/", getTasks); // GET route for fetching all tasks

export default router; 
