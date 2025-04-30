const express = require('express');
const router = express.Router();

const {
  createGoal,
  getGoalsByInterest,
  updateGoal,
  deleteGoal
} = require('../../controllers/goal.controller');

// Crear un nuevo goal
router.post('/', createGoal);

// Obtener todos los goals de un interés específico
router.get('/interest/:interestId', getGoalsByInterest);

// Actualizar un goal por ID
router.put('/:id', updateGoal);

// Eliminar un goal por ID
router.delete('/:id', deleteGoal);

module.exports = router;
