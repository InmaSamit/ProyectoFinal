const { body, param, validationResult } = require('express-validator');
const GoalModel = require('../models/goal.models');

// Función para crear un objetivo
const createGoal = async (req, res) => {

  // Validación de datos
  await body('title').notEmpty().withMessage('El título es obligatorio').run(req);
  await body('description').optional().isString().run(req);
  await body('interest_id').isInt().withMessage('El interés asociado no es válido').run(req);

  // cComprobación de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Intentamos crear
    const newGoalId = await GoalModel.create(req.body);
    res.status(201).json({ id: newGoalId });
  } catch (error) {
    console.error('Error al crear el objetivo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener todos los goals de un interés
const getGoalsByInterest = async (req, res) => {

  // Validación de datos
  await param('interestId').isInt().withMessage('El ID del interés debe ser numérico').run(req);

  // Comprobación de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Busqueda
    const goals = await GoalModel.getByInterest(req.params.interestId);
    res.json(goals);
  } catch (error) {
    console.error('Error al obtener los objetivos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para eliminar un objetivo
const deleteGoal = async (req, res) => {

  // Validación de datos
  await param('id').isInt().withMessage('ID inválido').run(req);

  // Comprobación de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Borramos
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
  deleteGoal
};
