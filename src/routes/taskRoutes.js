const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const authenticate = require('../middleware/auth');

router.use(authenticate); // All routes below require auth

router
    .route("/")
    .get(getAllTasks)
    .post(createTask);

router  
    .route("/:id")
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);


module.exports = router;
