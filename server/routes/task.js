import { Router } from "express";
import Task from "../controllers/task.js";
import authenticateJWT from "../middlewares/auth.js";
const router = Router();

router.post("/", authenticateJWT, Task.createTask);
router.get("/:projectId", authenticateJWT, Task.getTasksByProject);
router.get("/:taskId", authenticateJWT, Task.getTaskById);
router.put("/:taskId", authenticateJWT, Task.updateTaskById);
router.delete("/:taskId", authenticateJWT, Task.deleteTaskById);

export default router;
