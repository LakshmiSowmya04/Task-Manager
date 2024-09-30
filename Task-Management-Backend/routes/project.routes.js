import express from 'express';
import { createProject, getProjectById, getProjects } from '../controllers/project.controllers.js';
import authenticateJWT from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protect all project routes
router.use(authenticateJWT);


// Route to create a new project
router.post('/', createProject);

// Route to get all projects for a user
router.get('/', getProjects);

// Route to get a specific project by ID
router.get('/:projectId', getProjectById);

export default router;
