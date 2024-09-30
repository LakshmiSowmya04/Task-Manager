const express = require("express");
const TaskController = require("../controllers/task-controller");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth-middleware");

router.post("/", AuthMiddleware, TaskController.createTask);
router.get("/:projectId", AuthMiddleware, TaskController.getTasksByProject);

module.exports = router;
