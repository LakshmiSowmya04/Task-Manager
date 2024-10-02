import Project from '../models/project-models.js';
import Task from '../models/task-models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
// import { asyncHandler } from "../utils/asyncHandler.js";

const createProject = async (req, res) => {
	const { name, description } = req.body;

  if(!name || !description) {
    return res.status(400).json({
      message: 'Name and description are required'
    });
  }

  if(!req?.user?.id) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

	try {
		const project = new Project({
			user: req.user.id,
			name,
			description,
		});

		await project.save();
		res
			.status(201)
			.json(new ApiResponse(201, project, 'Project created successfully'));
	} catch (error) {
		throw res.status(400).json(new ApiError(400, 'Error creating project'))
	}
};

const getProjects = async (req, res) => {
  if (!req?.user?.id) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

	try {
		const projects = await Project.find({ user: req.user.id });
		res
			.status(200)
			.json(new ApiResponse(200, projects, 'Projects fetched successfully'));
	} catch (error) {
		throw res.status(500).json(new ApiError(500, 'Internal Server Error'));
	}
};

const getProjectById = async (req, res) => {
	const { projectId } = req.params;

	if (!projectId) {
		return res.status(400).json({
			message: 'Project Id is required',
		});
	}

	if (!req?.user?.id) {
		return res.status(401).json({
			message: 'Unauthorized',
		});
	}

	try {
		const project = await Project.findOne({
			_id: projectId,
			user: req.user.id,
		});
		if (!project) {
			return res.status(404).json({ message: 'Project not found.' });
		}

		res.status(200).json(project);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateProjectById = async (req, res) => {
	const { projectId } = req.params;
	const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message: 'Name and description are required'
    });
  }

	if (!projectId) {
		return res.status(400).json({
			message: 'Project Id is required',
		});
	}

	if (!req?.user?.id) {
		return res.status(401).json({
			message: 'Unauthorized',
		});
	}

	try {
		const project = await Project.findOne({
			_id: projectId,
			user: req.user.id,
		});

		if (!project) {
			return res.status(404).json({ message: 'Project not found.' });
		}

		project.name = name;
		project.description = description;
		project.save();
		return res.status(200).json(project);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteProjectById = async (req, res) => {
	const { projectId } = req.params;

	// Validate if projectId is provided
	if (!projectId) {
		return res.status(400).json({
			message: 'Project Id is required',
		});
	}

	// Validate if user is authorized
	if (!req?.user?.id) {
		return res.status(401).json({
			message: 'Unauthorized',
		});
	}

	try {
		// Find the project associated with the user
		const project = await Project.findOne({
			_id: projectId,
			user: req.user.id,
		});

		if (!project) {
			return res.status(404).json({ message: 'Project not found.' });
		}

		// Delete all tasks associated with the project
		await Task.deleteMany({ project: projectId });

		// Delete the project itself using deleteOne()
		await Project.deleteOne({ _id: projectId, user: req.user.id });

		return res
			.status(200)
			.json({ message: 'Project and associated tasks deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export default {
	createProject,
	getProjects,
	getProjectById,
	updateProjectById,
	deleteProjectById,
};
