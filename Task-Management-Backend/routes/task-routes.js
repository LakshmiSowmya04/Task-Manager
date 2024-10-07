import { Router } from "express";
import Task from "../controllers/task-controllers.js";
import authenticateJWT from "../middlewares/auth-middleware.js";
const router = Router();

router.post("/", authenticateJWT, Task.createTask);
router.get("/", authenticateJWT, Task.getAllTasks);
router.get("/p/:projectId", authenticateJWT, Task.getTasksByProject);
router.get("/t/:taskId", authenticateJWT, Task.getTaskById);
router.put("/t/:taskId", authenticateJWT, Task.updateTaskById);
router.delete("/t/:taskId", authenticateJWT, Task.deleteTaskById);

export default router;
