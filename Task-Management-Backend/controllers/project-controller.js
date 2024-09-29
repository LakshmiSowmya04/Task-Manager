const Project = require("../models/Project");

const create = async (req, res) => {
    const project = new Project(req.body);
    console.log(req.body);
    try {
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
};

const get = async (req, res) => {
    const projects = await Project.find();
    res.send(projects);
};

module.exports = {
    create,
    get,
};
