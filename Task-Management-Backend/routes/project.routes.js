import express from 'express';
import { createProject, getProjectById, getProjects } from '../controllers/project.controllers.js';
// import authenticateJWT from '../middlewares/auth.middleware.js';

const router = express.Router();

// // Protect all project routes
// router.use(authenticateJWT);


router.post('/', createProject);

router.get('/', getProjects);

router.get('/:projectId', getProjectById);

export default router;
