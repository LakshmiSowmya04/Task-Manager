import { Router } from "express"; 
import { createTask, getTasks } from "../controllers/tasks.controllers.js";

const router = Router();

// Define routes for tasks
router.post("/", createTask); 
router.get("/", getTasks); 

export default router; 
