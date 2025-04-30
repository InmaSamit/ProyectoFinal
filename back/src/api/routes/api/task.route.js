const express = require('express');
const router = express.Router();
const TaskController = require('../../controllers/task.controller');

router.post('/', TaskController.createTask);
router.get('/:goalId', TaskController.getTasksByGoal);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
