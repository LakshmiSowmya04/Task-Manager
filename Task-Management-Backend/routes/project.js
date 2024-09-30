const express = require("express");
const ProjectController = require("../controllers/project-controller");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth-middleware");

router.post("/", AuthMiddleware, ProjectController.createProject);
router.get("/", AuthMiddleware, ProjectController.getProjects);
router.get("/:projectId", AuthMiddleware, ProjectController.getProjectById);

module.exports = router;
