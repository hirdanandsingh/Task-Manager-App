const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../services/taskService');

exports.createTask = async (req, res) => {
    const result = await createTask(req.body, req.userId);
    res.status(result.status).json(result);
};

exports.getAllTasks = async (req, res) => {
    const result = await getAllTasks(req.userId);
    res.status(result.status).json(result);
};

exports.getTaskById = async (req, res) => {
    const result = await getTaskById(req.params.id, req.userId);
    res.status(result.status).json(result);
};

exports.updateTask = async (req, res) => {
    const result = await updateTask(req.params.id, req.body, req.userId);
    res.status(result.status).json(result);
};

exports.deleteTask = async (req, res) => {
    const result = await deleteTask(req.params.id, req.userId);
    res.status(result.status).json(result);
};
