const express = require('express');
const router = express.Router();
const controller = require('../../controllers/routineTask.controller');

router.post('/', controller.createRoutineTask);
router.get('/routine/:routineId', controller.getByRoutine);
router.put('/:id', controller.updateRoutineTask);
router.delete('/:id', controller.deleteRoutineTask);

module.exports = router;
