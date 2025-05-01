const express = require('express');
const router = express.Router();
const controller = require('../../controllers/routineTask.controller');

//endpoints
router.post('/', controller.createRoutineTask);
router.get('/routine/:routineId', controller.getByRoutine);
router.delete('/:id', controller.deleteRoutineTask);

module.exports = router;
