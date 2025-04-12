const Task = require('../models/taskModel');

exports.createTask = async (data, userId) => {
    try {
        const task = await Task.create({ ...data, user: userId });
        return { status: 201, data: task };
    } catch (err) {
        return { status: 500, data: { message: 'Task creation failed', error: err.message } };
    }
};

exports.getAllTasks = async (userId) => {
    try {
        const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
        return { status: 200, data: tasks };
    } catch (err) {
        return { status: 500, data: { message: 'Fetching tasks failed', error: err.message } };
    }
};

exports.getTaskById = async (id, userId) => {
    try {
        const task = await Task.findOne({ _id: id, user: userId });
        if (!task) return { status: 404, data: { message: 'Task not found' } };
        return { status: 200, data: task };
    } catch (err) {
        return { status: 500, data: { message: 'Error fetching task', error: err.message } };
    }
};

exports.updateTask = async (id, data, userId) => {
    try {
        const task = await Task.findOneAndUpdate({ _id: id, user: userId }, data, { new: true });
        if (!task) return { status: 404, data: { message: 'Task not found' } };
        return { status: 200, data: task };
    } catch (err) {
        return { status: 500, data: { message: 'Task update failed', error: err.message } };
    }
};

exports.deleteTask = async (id, userId) => {
    try {
        const task = await Task.findOneAndDelete({ _id: id, user: userId });
        if (!task) return { status: 404, data: { message: 'Task not found' } };
        return { status: 200, data: { message: 'Task deleted' } };
    } catch (err) {
        return { status: 500, data: { message: 'Delete failed', error: err.message } };
    }
};
