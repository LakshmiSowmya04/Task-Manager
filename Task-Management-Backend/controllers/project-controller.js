const Project = require("../models/Project");

const createProject = async (req, res) => {
    const { name, description } = req.body;

    try {
        const project = new Project({
            user: req.user.id,
            name,
            description,
        });

        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjectById = async (req, res) => {
    const { projectId } = req.params;

  if(!projectId){
    return res.status(400).json({
      message: 'Project Id is required',
    });
  }

  if(!req?.user?.id){
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

    try {
        const project = await Project.findOne({ _id: projectId, user: req.user.id });
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProjectById = async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;

  if(!projectId){
    return res.status(400).json({
      message: 'Project Id is required',
    });
  }

  if(!req?.user?.id){
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  try {
    const project = await Project.findOne({ _id: projectId, user: req.user.id });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    project.name = name;
    project.description = description;
    project.save();
    return res.status(200).json(project);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const deleteProjectById = async (req, res) => {
  const { projectId } = req.params;

  if(!projectId){
    return res.status(400).json({
      message: 'Project Id is required',
    });
  }

  if(!req?.user?.id){
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  try{
    const project = await Project.findOne({ _id: projectId, user: req.user.id });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    await project.delete();
    return res.status(200).json({ message: "Project deleted successfully"})
  } catch(error){
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
	createProject,
	getProjects,
	getProjectById,
	updateProjectById,
	deleteProjectById,
};
