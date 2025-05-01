const express = require('express');
const router = express.Router();
const TaskController = require('../../controllers/task.controller');

//endpoints
router.post('/', TaskController.createTask);
router.get('/:goalId', TaskController.getTasksByGoal);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
