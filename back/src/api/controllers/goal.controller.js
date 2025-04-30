const { body, param, validationResult } = require('express-validator');
const GoalModel = require('../models/goal.models');

// Crear un goal
const createGoal = async (req, res) => {
  await body('title').notEmpty().withMessage('El título es obligatorio').run(req);
  await body('description').optional().isString().run(req);
  await body('interest_id').isInt().withMessage('El interés asociado no es válido').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newGoalId = await GoalModel.create(req.body);
    res.status(201).json({ id: newGoalId });
  } catch (error) {
    console.error('Error al crear el objetivo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los goals de un interés
const getGoalsByInterest = async (req, res) => {
  await param('interestId').isInt().withMessage('El ID del interés debe ser numérico').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const goals = await GoalModel.getAllByInterest(req.params.interestId);
    res.json(goals);
  } catch (error) {
    console.error('Error al obtener los objetivos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un goal
const updateGoal = async (req, res) => {
  await param('id').isInt().withMessage('ID inválido').run(req);
  await body('title').optional().notEmpty().withMessage('Título no válido').run(req);
  await body('description').optional().isString().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updated = await GoalModel.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Objetivo no encontrado' });
    }
    res.json({ message: 'Objetivo actualizado' });
  } catch (error) {
    console.error('Error al actualizar el objetivo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un goal
const deleteGoal = async (req, res) => {
  await param('id').isInt().withMessage('ID inválido').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const deleted = await GoalModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Objetivo no encontrado' });
    }
    res.json({ message: 'Objetivo eliminado' });
  } catch (error) {
    console.error('Error al eliminar el objetivo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createGoal,
  getGoalsByInterest,
  updateGoal,
  deleteGoal
};
