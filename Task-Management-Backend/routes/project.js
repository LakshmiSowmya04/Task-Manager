import { Router } from "express";
import Project from "../controllers/project-controllers.js";
import authenticateJWT from "../middlewares/auth-middleware.js";
const router = Router();

router.post("/", authenticateJWT, Project.createProject);
router.get("/", authenticateJWT, Project.getProjects);

router.get("/:projectId", authenticateJWT, Project.getProjectById);
router.put("/:projectId", authenticateJWT, Project.updateProjectById);
router.delete("/:projectId", authenticateJWT, Project.deleteProjectById);

export default router;
