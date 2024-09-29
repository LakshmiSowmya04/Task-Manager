const Task = require("../models/Task");

const create = async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

const get = async (req, res) => {
    const tasks = await Task.find().populate("project");
    res.send(tasks);
};

module.exports = {
    create,
    get,
};