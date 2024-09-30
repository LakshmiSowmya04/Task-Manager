// tasks.controllers.js
import Project from '../models/project.models.js';
import Task from '../models/task.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create Task
export const createTask = asyncHandler(async (req, res) => {
    const { name, deadline, priority, project } = req.body;

    // Validate required fields
    if (!name || !deadline || !priority || !project) {
        throw new ApiError(400, "All fields are required: name, deadline, priority, project.");
    }

    const projectExists = await Project.findOne({
        _id: project,
        user: req.user.id,
    });

    if (!projectExists) {
        throw new ApiError(404, "Project not found or you don't have access to it.");
    }

    const task = new Task({
        name,
        project,
        deadline,
        priority,
    });

    await task.save();
    res.status(201).json(new ApiResponse(201, task, "Task created successfully.", { taskId: task._id, projectId: project }));
});

// Get Tasks by Project
export const getTasksByProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const projectExists = await Project.findOne({
        _id: projectId,
        user: req.user.id,
    });

    if (!projectExists) {
        throw new ApiError(404, "Project not found or you don't have access to it.");
    }

    const tasks = await Task.find({ project: projectId }).populate('project', 'name'); // specify fields to populate
    res.status(200).json(new ApiResponse(200, tasks, "Tasks retrieved successfully."));
});
