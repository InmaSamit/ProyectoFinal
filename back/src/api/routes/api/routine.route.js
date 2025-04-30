const express = require('express');
const router = express.Router();
const RoutineController = require('../../controllers/routine.controller');

router.post('/', RoutineController.createRoutine);
router.get('/user/:userId', RoutineController.getRoutinesByUser);
router.put('/:id', RoutineController.updateRoutine);
router.delete('/:id', RoutineController.deleteRoutine);

module.exports = router;
