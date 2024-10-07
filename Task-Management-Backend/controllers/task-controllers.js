import Task from "../models/task-models.js";
import Project from "../models/project-models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = async (req, res) => {
    const { name, deadline, priority, project } = req.body;

    if (!req?.user?.id) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    if (!name || !deadline || !priority) {
        return res.status(400).json({
            message: "Name, deadline, priority and project are required",
        });
    }

    if (!project) {
        return res.status(400).json({
            message: "Project Id is required",
        });
    }

    try {
        const projectExists = await Project.findOne({
            _id: project,
            user: req.user.id,
        });

        if (!projectExists) {
            return res.status(404).json({
                message: "Project not found or you don't have access to it.",
            });
        }

        const task = new Task({
            name,
            project,
            deadline,
            priority,
        });

        await task.save();
        res.status(201).json(
            new ApiResponse(201, project, "Task created successfully")
        );
    } catch (error) {
        throw new ApiError(400, `Error creating task ${error.message}`);
    }
};

const getAllTasks = async (req, res) => {
    if (!req?.user?.id) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        const tasks = await Task.find().populate("project");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTasksByProject = async (req, res) => {
    const { projectId } = req.params;

    if (!req?.user?.id) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    if (!projectId) {
        return res.status(400).json({
            message: "Project Id is required",
        });
    }

    try {
        const projectExists = await Project.findOne({
            _id: projectId,
            user: req.user.id,
        });
        if (!projectExists) {
            return res.status(404).json({
                message: "Project not found or you don't have access to it.",
            });
        }

        const tasks = await Task.find({ project: projectId }).populate("project");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTaskById = async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        return res.status(400).json({
            message: "TaskId is required",
        });
    }

    try {
        const task = await Task.findOne({
            _id: taskId,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTaskById = async (req, res) => {
    const { taskId } = req.params;
    const { name, deadline, priority } = req.body;

    if (!taskId) {
        return res.status(400).json({
            message: "Task ID is required",
        });
    }

    if (!name || !deadline || !priority) {
        return res.status(400).json({
            message: "Name, deadline and priority are required",
        });
    }

    try {
        const task = await Task.findOne({
            _id: taskId,
        });
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        task.name = name;
        task.deadline = deadline;
        task.priority = priority;
        task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTaskById = async (req, res) => {
    const { taskId } = req.params;

    // Validate if taskId is provided
    if (!taskId) {
        return res.status(400).json({
            message: "Task ID is required",
        });
    }

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task does not exist",
            });
        }

        // Delete the task using deleteOne() or findByIdAndDelete()
        await Task.deleteOne({ _id: taskId });
        // Alternatively, you can use: await Task.findByIdAndDelete(taskId);

        return res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default {
    createTask,
    getTasksByProject,
    updateTaskById,
    deleteTaskById,
    getTaskById,
    getAllTasks
    // getTaskByUser,
};
