const express = require('express');
const router = express.Router();
const RoutineController = require('../../controllers/routine.controller');

//endpoints
router.post('/', RoutineController.createRoutine);
router.get('/', RoutineController.getRoutinesByUser);
router.delete('/:id', RoutineController.deleteRoutine);

module.exports = router;
