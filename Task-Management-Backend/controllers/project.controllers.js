import Project from '../models/project.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create Project
export const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const project = new Project({
        user: req.user.id,
        name,
        description,
    });

    await project.save();
    res.status(201).json(new ApiResponse(201, project, "Project created successfully."));
});

// Get All Projects
export const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(new ApiResponse(200, projects, "Projects retrieved successfully."));
});

// Get Project by ID
export const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findOne({ _id: projectId, user: req.user.id });
    if (!project) {
        throw new ApiError(404, "Project not found.");
    }

    res.status(200).json(new ApiResponse(200, project, "Project retrieved successfully."));
});
