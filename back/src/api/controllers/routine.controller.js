const { body, param, validationResult } = require('express-validator');
const RoutineModel = require('../models/routine.models');

const createRoutine = async (req, res) => {
  await body('user_id').isInt().withMessage('ID de usuario inválido').run(req);
  await body('name').notEmpty().withMessage('El nombre es obligatorio').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const id = await RoutineModel.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error al crear la rutina:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const getRoutinesByUser = async (req, res) => {
  await param('userId').isInt().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const routines = await RoutineModel.getAllByUser(req.params.userId);
    res.json(routines);
  } catch (error) {
    console.error('Error al obtener las rutinas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const updateRoutine = async (req, res) => {
  await param('id').isInt().run(req);
  await body('name').notEmpty().withMessage('Nombre inválido').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await RoutineModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Rutina no encontrada' });
    res.json({ message: 'Rutina actualizada' });
  } catch (error) {
    console.error('Error al actualizar la rutina:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const deleteRoutine = async (req, res) => {
  await param('id').isInt().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const deleted = await RoutineModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Rutina no encontrada' });
    res.json({ message: 'Rutina eliminada' });
  } catch (error) {
    console.error('Error al eliminar la rutina:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  createRoutine,
  getRoutinesByUser,
  updateRoutine,
  deleteRoutine
};
