import { Router } from "express";
import { createTask, getTasks } from "../controllers/tasks.controllers.js";
import { deleteTaskById, getTaskById, getTaskByUser, updateTaskById } from "../controllers/task-controller.js";

const router = Router();

// Define routes for tasks
router.post("/:project", createTask); // POST route for creating a task
router.get("/", getTasks); // GET route for fetching all tasks ( all users )
router.get("/:taskId", getTaskById); // GET route for fetching a task by ID
router.put("/:taskId", updateTaskById); // PUT route for updating a task by ID
router.delete("/:taskId", deleteTaskById); // DELETE
router.get('/:userId', getTaskByUser); // GET route for fetching all tasks by user ID

export default router;
