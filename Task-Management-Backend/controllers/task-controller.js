const Task = require('../models/Task');
const Project = require('../models/Project');

const createTask = async (req, res) => {
	const { name, deadline, priority, project } = req.body;

  if(!req?.user?.id){
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  if (!name || !deadline || !priority) {
    return res.status(400).json({
      message: 'Name, deadline, priority and project are required',
    });
  }

  if(!project){
    return res.status(400).json({
      message: 'Project Id is required',
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
		res.status(201).json(task);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getTasksByProject = async (req, res) => {
	const { projectId } = req.params;

  if(!req?.user?.id){
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  if(!projectId){
    return res.status(400).json({
      message: 'Project Id is required',
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

		const tasks = await Task.find({ project: projectId }).populate('project');
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getTaskById = async (req, res) => {
	const { taskId } = req.params;

	if (!taskId) {
		return res.status(400).json({
			message: 'TaskId is required',
		});
	}

	try {
		const task = await Task.findOne({
			_id: taskId,
		});

		if (!task) {
			return res.status(404).json({
				message: 'Task not found',
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
			message: 'Task ID is required',
		});
	}

	if (!name || !deadline || !priority) {
		return res.status(400).json({
			message: 'Name, deadline and priority are required',
		});
	}

	try {
		const task = await Task.findOne({
			_id: taskId,
		});
		if (!task) {
			return res.status(404).json({
				message: 'Task not found',
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

	if (!taskId) {
		return res.status(400).json({
			message: 'Task ID is required',
		});
	}

	try {
		const task = await Task.findOne({
			_id: taskId,
		});

		if (!task) {
			return res.status(404).json({
				message: 'Task Does not exist',
			});
		}

		await task.delete();
		return res.status(200).json({
			message: 'Task deleted successfully',
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getTaskByUser = async (req, res) => {
  const { userId } = req.params;

  if(!userId){
    return res.status(400).json({
      message: 'User Id is required',
    });
  }

  try {
    const tasks = await Task.find({ user: userId });

    if (!tasks) {
      return res.status(404).json({
        message: 'Tasks not found',
      });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
	createTask,
	getTasksByProject,
	updateTaskById,
	deleteTaskById,
	getTaskById,
	getTaskByUser,
};
