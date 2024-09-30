const Task = require("../models/Task");
const Project = require("../models/Project");

const createTask = async (req, res) => {
    const { name, deadline, priority, project } = req.body;

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
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTasksByProject = async (req, res) => {
    const { projectId } = req.params;

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

        const tasks = await Task.find({ project: projectId }).populate(
            "project"
        );
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getTasksByProject,
};
